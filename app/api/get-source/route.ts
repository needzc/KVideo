import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // 1. 获取 URL 中的 token 参数
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  // 2. 加密校验
  if (token !== "w6yHQSAUmt0eOvqlotiMGkYL91D185lU") {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    // 3. 获取环境变量 (确保 Vercel 中变量名为 MYSOURCES)
    const secretData = process.env.MYSOURCES;

    if (!secretData) {
      console.error("环境变量 MYSOURCES 未找到");
      return NextResponse.json({ error: "Configuration Missing" }, { status: 500 });
    }

    // 4. 解析并返回 JSON
    const data = JSON.parse(secretData);
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("JSON 解析失败:", error);
    return NextResponse.json({ error: "Invalid JSON Format" }, { status: 500 });
  }
}