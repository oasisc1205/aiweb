export enum Page {
    Home = 'home',
    Evidence = 'evidence',
    Guide = 'guide',
    Experts = 'experts',
    Settings = 'settings'
}

export interface EvidenceFile {
    id: string;
    name: string;
    type: string;
    size: number;
    uploadDate: Date;
    description: string;
    previewUrl?: string;
}

export interface ExpertAd {
    id: string;
    name: string;
    type: 'lawyer' | 'detective';
    description: string;
    imageUrl: string;
    targetUrl: string;
}

export interface ShoppingProduct {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
}
