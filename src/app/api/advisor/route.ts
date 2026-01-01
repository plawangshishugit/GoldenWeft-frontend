import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

/* ---------- Hash helper ---------- */
function hashAnswers(answers: Record<string, string>) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(answers))
    .digest("hex");
}

export async function POST(req: Request) {
  try {
    const { answers } = await req.json();

    if (!answers || typeof answers !== "object") {
      return NextResponse.json(
        { error: "Invalid answers payload" },
        { status: 400 }
      );
    }

    /* ---------- 0️⃣ Compute hash ---------- */
    const answersHash = hashAnswers(answers);

    /* =====================================================
       1️⃣ CHECK CACHE (AdvisorSession)
    ===================================================== */
    const cachedSession = await prisma.advisorSession.findFirst({
      where: { answersHash },
    });

    if (cachedSession) {
      return NextResponse.json({
        advisorSessionId: cachedSession.id,
        recommendations: cachedSession.recommendations,
        cached: true,
      });
    }

    /* =====================================================
       2️⃣ Fetch products
    ===================================================== */
    const products = await prisma.product.findMany({
      where: { isActive: true },
    });

    if (products.length === 0) {
      return NextResponse.json({
        advisorSessionId: null,
        recommendations: [],
      });
    }

    /* =====================================================
       3️⃣ Call ML service
    ===================================================== */
    const mlRes = await fetch(
      `${process.env.ML_SERVICE_URL}/recommend`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          products: products.map((p) => ({
            id: p.slug,
            fabric: p.fabric,
            weight: p.weight,
            style: p.style,
            tier: p.tier,
            tones: p.tones,
            occasions: p.occasions,
          })),
        }),
      }
    );

    if (!mlRes.ok) {
      throw new Error("ML service failed");
    }

    const mlResponse = await mlRes.json();

    /* =====================================================
       4️⃣ Normalize ML response
    ===================================================== */
    const mlRecommendations = Array.isArray(mlResponse)
      ? mlResponse
      : Array.isArray(mlResponse?.recommendations)
      ? mlResponse.recommendations
      : [];

    /* =====================================================
       5️⃣ Attach product info
    ===================================================== */
    const recommendations = mlRecommendations
      .map((r: any) => {
        const product = products.find(
          (p) => p.slug === r.productId
        );
        if (!product) return null;

        return {
          product: {
            id: product.slug,
            name: product.name,
            fabric: product.fabric,
            weight: product.weight,
            style: product.style,
            tier: product.tier,
            tones: product.tones,
            occasion: product.occasions,
            isNew: product.isNew,
          },
          confidence: Math.round(r.confidence ?? 0),
          reasons: r.reasons ?? [],
        };
      })
      .filter(Boolean);

    /* =====================================================
       6️⃣ STORE SESSION (CACHE WRITE)
    ===================================================== */
    const session = await prisma.advisorSession.create({
      data: {
        answers,
        answersHash, // ✅ MATCHES SCHEMA
        recommendations,
      },
    });

    /* =====================================================
       7️⃣ Response
    ===================================================== */
    return NextResponse.json({
      advisorSessionId: session.id,
      recommendations,
      cached: false,
    });

  } catch (err) {
    console.error("Advisor ML integration error:", err);
    return NextResponse.json(
      { error: "Advisor ML failed" },
      { status: 500 }
    );
  }
}
