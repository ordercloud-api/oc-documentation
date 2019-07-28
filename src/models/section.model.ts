export interface Section {
    title: string;
    guides: Guide[]
}

export interface Guide {
    id: string;
    frontmatter: {
        path: string;
        section: string;
        title: string;
        hidden?: boolean;
    }
    headings: [
        { 
            value: string;
        }
    ]
}