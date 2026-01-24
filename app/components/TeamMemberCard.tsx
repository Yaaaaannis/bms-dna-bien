import Image from 'next/image';

interface TeamMember {
    fileNumber: string;
    crime: string;
    sruId: string;
    idCode: string;
    name: string;
    handle: string;
    pronouns: string;
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
        <div className="w-full text-white font-sans max-w-3xl lg:scale-95 origin-bottom lg:origin-bottom-right bg-black/90 lg:bg-transparent p-4 lg:p-0 rounded-xl lg:rounded-none border border-white/20 lg:border-none backdrop-blur-sm lg:backdrop-blur-none">
            {/* Header info */}
            <div className="flex justify-between items-start mb-2 text-[11px] font-mono tracking-wider">
                <div className="flex flex-col gap-0.5 w-full lg:w-1/3">
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
                <div className="hidden lg:flex -mr-[20px]">
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

            <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[450px]">

                {/* Mobile Top Row: Image + Details */}
                <div className="flex lg:hidden flex-row gap-4">
                    {/* Image */}
                    <div className="relative w-32 h-40 shrink-0 border border-white">
                        <div className="relative w-full h-full contrast-125">
                            <Image
                                src={member.cardImage || member.image}
                                alt={member.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col w-full min-w-0">
                        <div
                            className="text-xs font-bold uppercase mb-1 truncate"
                            style={{ fontFamily: 'DrukWideBold, sans-serif' }}
                        >
                            {member.idCode}
                        </div>
                        <div className="flex flex-col gap-0.5 border-t border-white pt-1">
                            <LabelValue label="NAME" value={member.name} />
                            <LabelValue label="ID" value={member.handle} />
                            <LabelValue label="JOB" value={member.job} />
                        </div>
                    </div>
                </div>

                {/* Column 1: Image & Fingerprints (Desktop Only for Image structure) */}
                <div className="hidden lg:flex w-1/3 flex-col gap-2 h-full">
                    <div className="relative w-full flex-1  border border-white">
                        {/* Mugshot lines background */}

                        <div className="relative w-full h-full  contrast-125 ">
                            <Image
                                src={member.cardImage || member.image}
                                alt={member.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Fingerprints section */}
                    <div className="mt-auto shrink-0">
                        <div className="text-[11px] font-bold uppercase mb-1 border-b border-white inline-block pr-4">
                            FINGERPRINTS /
                        </div>
                        <div className="relative w-full mt-1 border border-white/30">
                            <Image
                                src="/images/doigt.jpg"
                                alt="Fingerprint"
                                width={541}
                                height={249}
                                className="w-full h-auto block"
                            />
                        </div>
                    </div>
                </div>

                {/* Column 2: Details (Desktop) / Missions (Mobile & Desktop) */}
                <div className="w-full lg:w-1/3 flex flex-col font-sans h-full">
                    {/* Desktop ID & Details - Hidden on mobile as we showed them above */}
                    <div className="hidden lg:block">
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
                            <LabelValue label="JOB" value={member.job} />
                            <LabelValue label="MAIL" value={member.mail} />
                        </div>
                    </div>

                    {/* Missions & Text - Visible on both, but style adjusted */}
                    <div className="flex-1 mt-2 lg:mt-0">
                        <div className="text-[11px] font-bold text-orange-400 uppercase mb-1">
                            MISSIONS & QUALIFICATIONS
                        </div>
                        <p className="text-[11px] leading-relaxed text-gray-300 mb-2 text-justify line-clamp-[8] lg:line-clamp-none">
                            {member.missions}. <br />
                            {member.description}
                        </p>
                    </div>
                </div>

                {/* Column 3: GIF / Vertical Graphic (1/3) - Hidden on Mobile */}
                <div className="hidden lg:flex w-1/3 h-full border border-white relative overflow-hidden flex-col items-center justify-center bg-black/50">
                    <Image
                        src="/images/dna-gif.gif"
                        alt="DNA Animation"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>

            </div>
        </div>
    );
}
