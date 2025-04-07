import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

// Caminho do JSON
const filePath = path.join(process.cwd(), "/data/24-25/noticias.json");

export async function GET() {
  try {
    const data = readFileSync(filePath, "utf-8");
    const noticias = JSON.parse(data || "[]");
    return NextResponse.json(noticias);
  } catch (error) {
    console.error("❌ Erro ao ler noticias.json:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.titulo || !body.conteudo || !body.autor || !body.data) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
    }

    const novaNoticia = {
      titulo: body.titulo,
      conteudo: body.conteudo,
      autor: body.autor,
      data: body.data,
      foto: body.foto || "/fotos/24-25/default.jpg",
    };

    const data = readFileSync(filePath, "utf-8");
    const noticias = JSON.parse(data || "[]");

    noticias.unshift(novaNoticia); // adiciona no topo

    writeFileSync(filePath, JSON.stringify(noticias, null, 2), "utf-8");

    return NextResponse.json({ message: "✅ Notícia adicionada com sucesso." });
  } catch (error) {
    console.error("❌ Erro ao salvar notícia:", error);
    return NextResponse.json({ error: "Erro interno ao salvar notícia." }, { status: 500 });
  }
}
