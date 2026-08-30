import { PrismaClient, RequestStatus, AlertLevel, Role, AttachmentType } from "@prisma/client";
import { ALL_40_MOCK_PROPOSALS } from "../../src/lib/db/mock-proposals";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding 40 Rich Mock Budget Proposals into PostgreSQL...");

  // 1. Ensure required users exist
  const userMap: Record<string, string> = {};

  for (const p of ALL_40_MOCK_PROPOSALS) {
    if (!userMap[p.requesterId]) {
      const user = await prisma.user.upsert({
        where: { email: p.requesterEmail },
        update: {
          name: p.requesterName,
          thaiName: p.requesterName,
          faculty: p.faculty,
          department: p.department,
        },
        create: {
          id: p.requesterId,
          email: p.requesterEmail,
          name: p.requesterName,
          thaiName: p.requesterName,
          faculty: p.faculty,
          department: p.department,
          position: "อาจารย์ / นักวิจัย / บุคลากร มข.",
          role: Role.REQUESTER,
        },
      });
      userMap[p.requesterId] = user.id;
    }
  }

  // Also ensure verifier, approver, admin exist
  await prisma.user.upsert({
    where: { email: "verifier.sci@kku.ac.th" },
    update: {},
    create: {
      id: "emp-002",
      email: "verifier.sci@kku.ac.th",
      name: "Prasert Rakngan",
      thaiName: "นายประเสริฐ รักงาน",
      faculty: "คณะวิทยาศาสตร์",
      department: "งานแผนและนโยบาย",
      position: "เจ้าหน้าที่บริหารงานทั่วไป ชำนาญการ",
      role: Role.DEPT_VERIFIER,
    },
  });

  await prisma.user.upsert({
    where: { email: "dean.sci@kku.ac.th" },
    update: {},
    create: {
      id: "emp-003",
      email: "dean.sci@kku.ac.th",
      name: "Prof. Dr. Viroj Vises",
      thaiName: "ศ.ดร.วิโรจน์ วิเศษ",
      faculty: "คณะวิทยาศาสตร์",
      department: "สำนักงานคณบดี",
      position: "คณบดีคณะวิทยาศาสตร์",
      role: Role.APPROVER,
    },
  });

  await prisma.user.upsert({
    where: { email: "admin.procure@kku.ac.th" },
    update: {},
    create: {
      id: "emp-004",
      email: "admin.procure@kku.ac.th",
      name: "Kornkanok Petch",
      thaiName: "นางสาวกรกนก เพชรแท้",
      faculty: "กองคลังและพัสดุ",
      department: "งานบริหารพัสดุและทรัพย์สิน",
      position: "นักวิชาการพัสดุ ชำนาญการพิเศษ",
      role: Role.ADMIN,
    },
  });

  let proposalCount = 0;

  // 2. Insert or update 40 budget requests
  for (const p of ALL_40_MOCK_PROPOSALS) {
    const existing = await prisma.budgetRequest.findUnique({
      where: { code: p.code },
    });

    const dataPayload = {
      code: p.code,
      title: p.title,
      fiscalYear: p.fiscalYear,
      faculty: p.faculty,
      department: p.department,
      requesterId: userMap[p.requesterId] || "emp-001",
      status: p.status as RequestStatus,
      category: p.category,
      totalBudgetBaht: p.totalBudgetBaht,
      quantity: p.quantity,
      unit: p.unit,
      unitPriceBaht: p.unitPriceBaht,
      standardMatched: p.standardMatched,
      standardName: p.standardName || null,
      alertLevel: p.alertLevel as AlertLevel,
      form8Sections: p.form8Sections as any,
      neutralSpec: p.neutralSpec as any,
      aiAnalysisLog: p.aiAnalysis as any,
      createdAt: new Date(p.createdAt),
      updatedAt: new Date(p.updatedAt),
    };

    let reqId = existing?.id;

    if (!existing) {
      const created = await prisma.budgetRequest.create({
        data: dataPayload,
      });
      reqId = created.id;
      proposalCount++;
    } else {
      await prisma.budgetRequest.update({
        where: { id: existing.id },
        data: dataPayload,
      });
      proposalCount++;
    }

    // Attachments
    if (p.attachments && reqId) {
      await prisma.attachment.deleteMany({ where: { requestId: reqId } });
      for (const att of p.attachments) {
        await prisma.attachment.create({
          data: {
            requestId: reqId,
            type: att.type as AttachmentType,
            fileName: att.fileName,
            fileSize: att.fileSize,
            contentType: att.contentType,
            storageKey: att.storageKey,
            createdAt: new Date(att.uploadedAt || p.createdAt),
          },
        });
      }
    }

    // Review Comments
    if (p.reviewComments && reqId) {
      await prisma.reviewComment.deleteMany({ where: { requestId: reqId } });
      for (const comm of p.reviewComments) {
        await prisma.reviewComment.create({
          data: {
            requestId: reqId,
            authorId: comm.authorId,
            content: comm.content,
            action: comm.action,
            createdAt: new Date(comm.createdAt),
          },
        });
      }
    }
  }

  console.log(`✅ Successfully seeded ${proposalCount} budget requests and related data.`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
