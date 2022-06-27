export type Source = {
    website: string;
    page: string;
    format: string;
    pad: number;
};

export type Bookmark = {
    _id: string;
    title: string;
    chapter: number;
    url: Source;
    imgUrl: string;
};

export type NewChapter = {
    _id: string;
    bookmark_id: string;
    chapter: number;
};