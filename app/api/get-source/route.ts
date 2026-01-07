import { NextResponse, NextRequest } from 'next/server';

// 强制告诉 Vercel 这是一个动态路由，不要在构建时静态化
export const dynamic = 'force-dynamic'; 

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (token !== "w6yHQSAUmt0eOvqlotiMGkYL91D185lU") {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const secretData = process.env.MYSOURCES;
    if (!secretData) {
      return NextResponse.json({ error: "Missing Env" }, { status: 500 });
    }
    return NextResponse.json(JSON.parse(secretData));
  } catch (e) {
    return NextResponse.json({ error: "JSON Error" }, { status: 500 });
  }
}
