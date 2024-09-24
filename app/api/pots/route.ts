import { NextRequest, NextResponse } from "next/server";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "@langchain/openai";

import path from "path";

export async function GET(req: NextRequest) {
    try {

        const folder_path = path.join(process.cwd(), "public");
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

        const queryString = req.nextUrl.searchParams.get('q') || ''

        const k = req.nextUrl.searchParams.get('k') || '1'

        const vectorStore = await HNSWLib.load(
            `${folder_path}/pots`,
            new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY }),
        );

        const res = await vectorStore.similaritySearch(queryString, parseInt(k));
        const results = res.map(data => JSON.parse(data.pageContent))

        return NextResponse.json(results, { status: 200 });

    } catch (e: any) {

        return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
    }
}