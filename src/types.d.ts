export type Output = {
    title: string,
    message: string
};

type Source = {
    website: string;
    page: string;
    format: string;
    pad: string;
};

export type Bookmark = {
    _id: string;
    title: string;
    chapter: number;
    url: Source;
};