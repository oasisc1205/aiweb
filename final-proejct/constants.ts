import { ExpertAd, ShoppingProduct } from './types';

export const GUIDE_CONTENT = [
    {
        id: 'step1',
        name: '1단계: 초기 대응 및 증거 수집',
        articles: [
            { id: '1-1', title: '감정적 충격 다스리기', content: '배우자의 외도를 알게 된 후의 감정적 혼란은 당연합니다. 전문가의 도움을 받거나 신뢰할 수 있는 친구와 이야기하는 것이 중요합니다.' },
            { id: '1-2', title: '증거의 중요성', content: '법적 절차를 고려한다면 증거는 매우 중요합니다. 대화 기록, 사진, 영수증 등 모든 것을 안전하게 보관하세요.' },
            { id: '1-3', title: '불법적인 증거 수집의 위험성', content: '도청, 미행, 해킹 등 불법적인 방법으로 증거를 수집하면 법적으로 불리해질 수 있으니 주의해야 합니다.' },
        ]
    },
    {
        id: 'step2',
        name: '2단계: 법적 선택지 알아보기',
        articles: [
            { id: '2-1', title: '변호사 상담', content: '이혼 전문 변호사와 상담하여 자신의 상황에 맞는 법적 조언을 구하는 것이 첫걸음입니다.' },
            { id: '2-2', title: '이혼 소송과 위자료 청구', content: '배우자의 외도는 이혼 사유가 되며, 정신적 피해에 대한 위자료를 청구할 수 있습니다.' },
        ]
    },
    {
        id: 'step3',
        name: '3단계: 소송 준비 및 진행',
        articles: [
            { id: '3-1', title: '소장 작성 및 제출', content: '변호사와 함께 소장을 작성하고 필요한 서류를 준비하여 법원에 제출합니다.' },
            { id: '3-2', title: '재산 분할', content: '부부가 혼인 기간 동안 함께 이룬 재산에 대해 기여도에 따라 분할을 청구할 수 있습니다.' },
        ]
    }
];

export const EXPERT_ADS: ExpertAd[] = [
    {
        id: 'lawyer1',
        name: '김민준 변호사',
        type: 'lawyer',
        description: '이혼 및 가사 소송 전문. 당신의 편에서 최선의 결과를 위해 싸웁니다.',
        imageUrl: 'https://images.unsplash.com/photo-1590650213165-c68193a03d15?q=80&w=800',
        targetUrl: '#'
    },
    {
        id: 'detective1',
        name: '최고 탐정 사무소',
        type: 'detective',
        description: '합법적인 방법으로 신속하고 정확한 사실 관계를 파악해 드립니다.',
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800',
        targetUrl: '#'
    },
    {
        id: 'lawyer2',
        name: '박서연 변호사',
        type: 'lawyer',
        description: '여성의 입장에서 섬세하고 꼼꼼하게 사건을 해결합니다. 비밀 보장.',
        imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800',
        targetUrl: '#'
    }
];

export const HOME_NEWS = [
    { id: 'news1', date: '2024년 7월 28일', title: '새로운 판례: 디지털 증거의 중요성 부각', summary: '최근 법원은 메신저 대화 내용과 같은 디지털 증거를 외도의 결정적 증거로 인정하는 판결을 내렸습니다.' },
    { id: 'news2', date: '2024년 7월 25일', title: '무료 법률 상담 주간 안내', summary: '오는 8월 첫째 주, 가정 법률 지원 센터에서 무료로 법률 상담을 제공합니다. 예약이 필요합니다.' },
    { id: 'news3', date: '2024년 7월 22일', title: '양육비 관련 법안 개정, 책임 강화', summary: '최근 국회에서 양육비를 지급하지 않는 부모에 대한 처벌을 강화하는 법안이 통과되었습니다.' },

];

export const HOME_QA = [
    { id: 'qa1', author: '희망찾기', question: '변호사 선임 비용이 부담스러운데, 어떻게 해야 할까요?', answers: 5, views: 128 },
    { id: 'qa2', author: '새출발', question: '상대방이 외도를 인정하지 않을 때 증거는 어느 정도여야 하나요?', answers: 8, views: 256 },
];

export const HOME_STORIES = [
    { id: 'story1', author: '용기낸사람', date: '2024년 7월 27일', content: '이 앱 덕분에 흩어져 있던 증거들을 체계적으로 정리할 수 있었어요. 정말 큰 도움이 되었습니다.' },
];

export const SHOPPING_PRODUCTS: ShoppingProduct[] = [
    {
        id: 'prod1',
        name: '클래식 린넨 셔츠',
        price: '79,000원',
        imageUrl: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?q=80&w=800'
    },
    {
        id: 'prod2',
        name: '데일리 코튼 팬츠',
        price: '89,000원',
        imageUrl: 'https://images.unsplash.com/photo-1602293589914-9e19a9da20ec?q=80&w=800'
    },
    {
        id: 'prod3',
        name: '프리미엄 레더 스니커즈',
        price: '159,000원',
        imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800'
    },
    {
        id: 'prod4',
        name: '미니멀리스트 크로스백',
        price: '129,000원',
        imageUrl: 'https://images.unsplash.com/photo-1566150905458-1bf1bc112f2d?q=80&w=800'
    }
];
