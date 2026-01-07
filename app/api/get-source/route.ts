// pages/api/get-source.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // 加密校验
    const { token } = req.query;
    if (token !== "w6yHQSAUmt0eOvqlotiMGkYL91D185lU") {
      return res.status(403).send("Forbidden");
    }
  try {
    // 从环境变量获取隐藏的 JSON 内容
    const secretData = process.env.MYSOURCES;
    
    if (!secretData) {
      return res.status(404).json({ error: "Source not found" });
    }

    // 将字符串解析为对象再返回，确保输出是标准 JSON
    const data = JSON.parse(secretData);
    
    // 设置缓存控制（可选），让 Edge 网络缓存数据提高访问速度
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Invalid JSON format" });
  }
}
