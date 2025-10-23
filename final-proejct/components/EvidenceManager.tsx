import React, { useState, useCallback, useMemo } from 'react';
import { EvidenceFile } from '../types';
import { UploadIcon, ImageIcon, VideoIcon, AudioIcon, TextIcon, FilterIcon } from './icons/Icons';

const EvidenceManager: React.FC = () => {
    const [evidence, setEvidence] = useState<EvidenceFile[]>([]);
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [filter, setFilter] = useState('all');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const newEvidence: EvidenceFile = {
                id: new Date().toISOString(),
                name: selectedFile.name,
                type: selectedFile.type,
                size: selectedFile.size,
                uploadDate: new Date(),
                description: description,
                previewUrl: selectedFile.type.startsWith('image/') ? e.target?.result as string : undefined
            };
            setEvidence(prev => [newEvidence, ...prev]);
            setSelectedFile(null);
            setDescription('');
        };
        reader.readAsDataURL(selectedFile);
    };
    
    const getFileIcon = (type: string) => {
        if (type.startsWith('image/')) return <ImageIcon className="w-8 h-8 text-blue-500" />;
        if (type.startsWith('video/')) return <VideoIcon className="w-8 h-8 text-purple-500" />;
        if (type.startsWith('audio/')) return <AudioIcon className="w-8 h-8 text-green-500" />;
        return <TextIcon className="w-8 h-8 text-gray-500" />;
    };

    const filteredEvidence = useMemo(() => {
        if (filter === 'all') return evidence;
        return evidence.filter(item => item.type.startsWith(filter));
    }, [evidence, filter]);

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">증거 관리</h1>

            {/* Upload Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">새 증거 업로드</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">파일 선택</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                        <span>파일 업로드</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                                    </label>
                                    <p className="pl-1">또는 드래그 앤 드롭</p>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-500">{selectedFile ? selectedFile.name : '최대 1GB의 PNG, JPG, MP4, MP3 파일'}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">설명 (선택 사항)</label>
                        <textarea
                            id="description"
                            rows={4}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="예: ...에 대한 대화 스크린샷"
                        />
                    </div>
                </div>
                <div className="mt-4 text-right">
                    <button
                        onClick={handleUpload}
                        disabled={!selectedFile}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        안전하게 업로드
                    </button>
                </div>
            </div>

            {/* Evidence List */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">저장된 증거 ({filteredEvidence.length})</h2>
                    <div className="flex items-center gap-2">
                        <FilterIcon className="w-5 h-5 text-gray-500"/>
                        <select onChange={(e) => setFilter(e.target.value)} value={filter} className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-1.5 text-sm">
                            <option value="all">전체</option>
                            <option value="image">이미지</option>
                            <option value="video">동영상</option>
                            <option value="audio">오디오</option>
                            <option value="application">문서</option>
                        </select>
                    </div>
                </div>
                
                {filteredEvidence.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">아직 저장된 증거가 없습니다. 위 양식을 사용하여 첫 파일을 추가하세요.</p>
                ) : (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredEvidence.map(item => (
                            <li key={item.id} className="py-4 flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    {item.previewUrl ? <img src={item.previewUrl} alt="preview" className="w-16 h-16 rounded-md object-cover" /> : getFileIcon(item.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{item.description || '설명 없음'}</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">
                                        {(item.size / 1024 / 1024).toFixed(2)} MB &middot; {item.uploadDate.toLocaleDateString()}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default EvidenceManager;