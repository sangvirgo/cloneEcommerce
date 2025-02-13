const HomeSectionCard = () => {
    return (
        <div className="mx-2 cursor-pointer group">
            <div className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                <div className="h-[13rem] w-full">
                    <img 
                        src="https://cafebiz.cafebizcdn.vn/thumb_w/640/162123310254002176/2022/4/28/photo1651157186008-1651157186684548707837.jpg" 
                        alt="HanTin" 
                        className="object-cover object-top w-full h-full"
                    />
                </div>

                <div className="p-4 w-full">
                    <h3 className="text-lg font-medium text-gray-900">HanTin</h3>
                    <p className="mt-2 text-sm text-gray-500">Men solid pure cotton</p>
                </div>
            </div>
        </div>
    );
};

export default HomeSectionCard;