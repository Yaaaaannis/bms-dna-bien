import Image from 'next/image';

interface TeamMember {
    fileNumber: string;
    crime: string;
    sruId: string;
    idCode: string;
    name: string;
    handle: string;
    pronouns: string;
    age: string;
    job: string;
    mail: string;
    missions: string;
    description: string;
    image: string;
    cardImage: string;
}

interface TeamMemberCardProps {
    member: TeamMember;
}

const LabelValue = ({ label, value }: { label: string, value: string }) => {
    const isTwitterHandle = label === "ID" && value.startsWith("@");
    const twitterUrl = isTwitterHandle ? `https://twitter.com/${value.slice(1)}` : null;
    
    return (
        <div className="flex flex-col border-b border-white/40 pb-1 mb-2">
            <div className="flex gap-2 items-baseline">
                <span className="text-white font-bold uppercase whitespace-nowrap" style={{ fontFamily: 'DrukWideBold, sans-serif', fontSize: '11px' }}>{label} : </span>
                {isTwitterHandle && twitterUrl ? (
                    <a 
                        href={twitterUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white text-sm truncate font-sans hover:underline"
                    >
                        {value}
                    </a>
                ) : (
                    <span className="text-white text-sm truncate font-sans">{value}</span>
                )}
            </div>
        </div>
    );
};

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
    return (
        <div className="w-full text-white font-sans max-w-3xl scale-95 origin-bottom-right">
            {/* Header info */}
            <div className="flex justify-between items-start mb-2 text-[11px] font-mono tracking-wider">
                <div className="flex flex-col gap-0.5 w-1/3">
                    <div className="flex justify-between border-b border-white/20 pb-0.5">
                        <span>FILE NUMBER</span>
                        <span>{member.fileNumber}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/20 pb-0.5">
                        <span>CRIME</span>
                        <span>{member.crime}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/20 pb-0.5">
                        <span>SRU ID</span>
                        <span>{member.sruId}</span>
                    </div>
                </div>
                <div className="flex -mr-[20px]">
                    <div className="flex flex-col items-start text-right">
                        <div className="text-[8px]  text-gray-400 font-mono ml-12">Creative Collective</div>
                        <div
                            className="text-s font-bold  uppercase leading-none ml-12 mt-1"
                            style={{ fontFamily: 'DrukWideBold, sans-serif' }}
                        >
                            CREATIVE RECORD
                        </div>
                        <div className="text-[12px] mt-6 ml-12 font-mono">@BMSDNA</div>
                    </div>
                    <div className="relative w-18 h-18">
                        <Image
                            src="/logo.svg"
                            alt="BMS DNA Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 h-[450px]">
                {/* Column 1: Image & Fingerprints (1/3) */}
                <div className="w-1/3 flex flex-col gap-2 h-full">
                    <div className="relative w-full flex-1 bg-white border border-white p-1">
                        {/* Mugshot lines background */}
                        <div
                            className="absolute inset-0 pointer-events-none z-10 opacity-30"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, #000000 20px)',
                            }}
                        />
                        <div className="relative w-full h-full grayscale contrast-125 bg-white">
                            <Image
                                src={member.cardImage || member.image}
                                alt={member.name}
                                fill
                                className="object-contain object-bottom"
                            />
                        </div>
                    </div>

                    {/* Fingerprints section */}
                    <div className="mt-auto shrink-0">
                        <div className="text-[11px] font-bold uppercase mb-1 border-b border-white inline-block pr-4">
                            FINGERPRINTS /
                        </div>
                        <div className="grid grid-cols-5 gap-1 mt-1 opacity-50">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                                <div key={i} className="aspect-[3/4] border border-white/30 rounded-full flex items-center justify-center">
                                    <div className="w-3/4 h-3/4 bg-white/10 rounded-full"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Column 2: Details (1/3) */}
                <div className="w-1/3 flex flex-col font-sans h-full">
                    {/* ID Code Header */}
                    <div
                        className="text-xs font-bold uppercase mb-1"
                        style={{ fontFamily: 'DrukWideBold, sans-serif' }}
                    >
                        {member.idCode}
                    </div>

                    {/* Details List */}
                    <div className="flex flex-col gap-0.5 mb-4 border-t border-white pt-1">
                        <LabelValue label="NAME" value={member.name} />
                        <LabelValue label="ID" value={member.handle} />
                        <LabelValue label="PRONOUNS" value={member.pronouns} />
                        <LabelValue label="AGE" value={member.age} />
                        <LabelValue label="JOB" value={member.job} />
                        <LabelValue label="MAIL" value={member.mail} />
                    </div>

                    {/* Missions & Text */}
                    <div className="flex-1">
                        <div className="text-[11px] font-bold text-orange-400 uppercase mb-1">
                            MISSIONS & QUALIFICATIONS
                        </div>
                        <p className="text-[11px] leading-relaxed text-gray-300 mb-2 text-justify ">
                            {member.missions}. <br />
                            {member.description}
                        </p>

                        
                    </div>
                </div>

                {/* Column 3: GIF / Vertical Graphic (1/3) */}
                <div className="w-1/3 h-full border border-white relative overflow-hidden flex flex-col items-center justify-center bg-black/50">
                    {/* Placeholder for GIF */}
                    <div className="w-full h-full opacity-20 flex flex-col items-center gap-1 text-[6px] font-mono leading-none text-center pt-1 animate-pulse">
                        <span className="text-xs font-bold">GIF AREA</span>
                        {Array.from({ length: 40 }).map((_, i) => (
                            <span key={i} className="block w-full">{i % 2 === 0 ? '<DNA>' : '</>'}</span>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
