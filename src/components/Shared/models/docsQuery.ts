export interface DocsQuery {
    mdx: {
        body: string;
        frontmatter: {
            path: string;
            title: string;
        }
    },
    allMdx: {
        totalCount: number;
        edges: [
            {
                node: {
                    id: string;
                    headings: [
                        {
                            value: string;
                        }
                    ],
                    frontmatter: {
                        section: string;
                        title: string;
                        path: string;
                        hidden?: boolean;
                    }
                }
            }
        ]
    }
}