export interface Notes {
    userID: string;
    notes: [NoteDetail];
    message: string;
    total_notes: number;
}

export interface Note {
    user_details: UserDetail;
    note: NoteDetail;
    message: string;
    total_notes: number;
}
export interface NoteDetail {
    comments: [];
    createdAt: string;
    description: string;
    pdf_doc: string;
    ratings: number;
    standard: string;
    subject: string;
    title: string;
    updatedAt: string;
    userId: UserDetail;
    _id: string;
}

export interface UserDetail {
    email: string;
    notes: [];
    password: string;
    username: string;
    _id: string;
}
