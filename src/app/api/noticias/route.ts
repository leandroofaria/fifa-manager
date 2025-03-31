import { NextResponse } from "next/server"
import { readFileSync } from "fs"
import path from "path"

// Corrigir o caminho do arquivo
const filePath = path.join(process.cwd(), "/data/24-25/noticias.json")

export async function GET() {
  try {
    const data = readFileSync(filePath, "utf-8")
    const noticias = JSON.parse(data || "[]")
    return NextResponse.json(noticias)
  } catch (error) {
    console.error("❌ Erro ao ler noticias.json:", error)
    return NextResponse.json([], { status: 500 })
  }
}
