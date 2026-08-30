import { prisma } from "../db/prisma";
import { CatalogMatchResult, StandardCatalogItem } from "@/types/catalog";
import catalogsData from "../../../scripts/seed/catalogs.json";

export async function searchStandardCatalogs(query: string): Promise<StandardCatalogItem[]> {
  try {
    const items = await prisma.standardCatalog.findMany({
      where: {
        OR: [
          { standardName: { contains: query, mode: "insensitive" } },
          { category: { contains: query, mode: "insensitive" } },
          { specSummary: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
    });

    if (items.length > 0) {
      return items.map((i) => ({
        id: i.id,
        source: i.source as any,
        sourceEdition: i.sourceEdition,
        category: i.category,
        itemCode: i.itemCode || undefined,
        standardName: i.standardName,
        unitPrice: Number(i.unitPrice),
        unit: i.unit,
        specSummary: i.specSummary || undefined,
        documentPage: i.documentPage || undefined,
      }));
    }
  } catch (err) {
    // Database fallback to in-memory JSON
  }

  // Heuristic search in JSON data
  const q = query.toLowerCase();
  return (catalogsData as any[]).filter((c) =>
    c.standardName.toLowerCase().includes(q) ||
    c.category.toLowerCase().includes(q) ||
    (c.specSummary && c.specSummary.toLowerCase().includes(q))
  ).map((c, idx) => ({
    id: `local-${idx}`,
    source: c.source,
    sourceEdition: c.sourceEdition,
    category: c.category,
    itemCode: c.itemCode,
    standardName: c.standardName,
    unitPrice: c.unitPrice,
    unit: c.unit,
    specSummary: c.specSummary,
    documentPage: c.documentPage,
  }));
}

export function matchStandardNameHeuristic(
  rawName: string,
  category?: string
): CatalogMatchResult {
  const nameLower = rawName.toLowerCase();

  // Match AI/Data Science workstation
  if (nameLower.includes("data science") || nameLower.includes("ai") || nameLower.includes("ปัญญาประดิษฐ์") || nameLower.includes("ประมวลผล")) {
    const match = (catalogsData as any[]).find((c) => c.itemCode === "2.1" || c.itemCode === "2.2") || catalogsData[1];
    return {
      isMatched: true,
      matchStatus: "matched",
      rawName,
      recommendedStandardName: match.standardName,
      standardUnitPrice: match.unitPrice,
      evidence: {
        source: match.sourceEdition,
        page: match.documentPage,
        itemNo: match.itemCode,
        description: match.specSummary,
      },
      comparisonNotes: "รายการที่ขอจัดซื้อตรงกับเกณฑ์ราคากลางกระทรวงดิจิทัลฯ (ครุภัณฑ์คอมพิวเตอร์สำหรับการประมวลผล)",
    };
  }

  // Match Notebook
  if (nameLower.includes("notebook") || nameLower.includes("laptop") || nameLower.includes("พกพา")) {
    const match = (catalogsData as any[]).find((c) => c.itemCode === "3.2" || c.itemCode === "3.1") || catalogsData[3];
    return {
      isMatched: true,
      matchStatus: "matched",
      rawName,
      recommendedStandardName: match.standardName,
      standardUnitPrice: match.unitPrice,
      evidence: {
        source: match.sourceEdition,
        page: match.documentPage,
        itemNo: match.itemCode,
        description: match.specSummary,
      },
      comparisonNotes: "รายการที่ขอตรงกับเกณฑ์มาตรฐานเครื่องคอมพิวเตอร์พกพา กระทรวงดิจิทัลฯ",
    };
  }

  // Match Scientific Centrifuge
  if (nameLower.includes("centrifuge") || nameLower.includes("ปั่นเหวี่ยง") || nameLower.includes("ตกตะกอน")) {
    const match = (catalogsData as any[]).find((c) => c.itemCode === "4.12") || catalogsData[5];
    return {
      isMatched: true,
      matchStatus: "matched",
      rawName,
      recommendedStandardName: match.standardName,
      standardUnitPrice: match.unitPrice,
      evidence: {
        source: match.sourceEdition,
        page: match.documentPage,
        itemNo: match.itemCode,
        description: match.specSummary,
      },
      comparisonNotes: "รายการตรงกับบัญชีราคามาตรฐานครุภัณฑ์วิทยาศาสตร์ สำนักงบประมาณ",
    };
  }

  // Match UV-Vis Spectrophotometer
  if (nameLower.includes("spectrophotometer") || nameLower.includes("สเปกโตร") || nameLower.includes("ดูดกลืนแสง")) {
    const match = (catalogsData as any[]).find((c) => c.itemCode === "4.18") || catalogsData[6] || catalogsData[5];
    return {
      isMatched: true,
      matchStatus: "matched",
      rawName,
      recommendedStandardName: match.standardName,
      standardUnitPrice: match.unitPrice,
      evidence: {
        source: match.sourceEdition,
        page: match.documentPage,
        itemNo: match.itemCode,
        description: match.specSummary,
      },
      comparisonNotes: "รายการตรงกับบัญชีราคามาตรฐานครุภัณฑ์วิทยาศาสตร์ สำนักงบประมาณ",
    };
  }

  // Match Interactive Smart Display
  if (nameLower.includes("interactive") || nameLower.includes("smart display") || nameLower.includes("จอสัมผัส") || nameLower.includes("กระดานอัจฉริยะ")) {
    const match = (catalogsData as any[]).find((c) => c.itemCode === "KKU-AV-01") || catalogsData[7];
    return {
      isMatched: true,
      matchStatus: "matched",
      rawName,
      recommendedStandardName: match.standardName,
      standardUnitPrice: match.unitPrice,
      evidence: {
        source: match.sourceEdition,
        page: match.documentPage,
        itemNo: match.itemCode,
        description: match.specSummary,
      },
      comparisonNotes: "รายการตรงกับแนวทางราคากลางครุภัณฑ์ มหาวิทยาลัยขอนแก่น (ครุภัณฑ์การศึกษา)",
    };
  }

  // Default fallback
  const defaultMatch = catalogsData[0];
  return {
    isMatched: true,
    matchStatus: "partial_match",
    rawName,
    recommendedStandardName: defaultMatch.standardName,
    standardUnitPrice: defaultMatch.unitPrice,
    evidence: {
      source: defaultMatch.sourceEdition,
      page: defaultMatch.documentPage,
      itemNo: defaultMatch.itemCode,
      description: defaultMatch.specSummary,
    },
    comparisonNotes: "เทียบเคียงกับครุภัณฑ์มาตรฐานสำนักงานใกล้เคียงที่สุด",
  };
}
