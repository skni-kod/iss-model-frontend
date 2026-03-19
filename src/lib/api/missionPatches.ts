export interface MissionInfo {
    patches: string[];
    description: string;
    wikiUrl?: string;
}

/**
 * Static mapping of known spacecraft/mission names to their patch images and descriptions.
 */
const missionPatches: Record<string, MissionInfo> = {
    "Shenzhou 22": {
        patches: [
            "https://upload.wikimedia.org/wikipedia/en/9/91/Shenzhou_22_mission_patch.png"
        ],
        description:
            "Shenzhou 22 to misja załogowa Chińskiej Agencji Kosmicznej (CMSA) do stacji kosmicznej Tiangong. Trzyosobowa załoga realizuje badania naukowe na orbicie.",
        wikiUrl: "https://en.wikipedia.org/wiki/Shenzhou_22",
    },
    "Soyuz MS-28": {
        patches: [
            "https://upload.wikimedia.org/wikipedia/en/4/49/Soyuz_MS-28_mission_patch.png"
        ],
        description:
            "Sojuz MS-28 to rosyjska misja załogowa do Międzynarodowej Stacji Kosmicznej. Załoga składa się z kosmonautów Roskosmosu i astronauty NASA.",
        wikiUrl: "https://en.wikipedia.org/wiki/Soyuz_MS-28",
    },
    "Crew-12 Dragon": {
        patches: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/SpaceX_Crew-12_logo.png/960px-SpaceX_Crew-12_logo.png",
            "https://upload.wikimedia.org/wikipedia/en/2/27/SpaceX_Crew-12_mission_patch.png",
            "https://upload.wikimedia.org/wikipedia/en/5/5a/Epsilon_mission_insignia.png"
        ],
        description:
            "SpaceX Crew-12 to dwunasta operacyjna misja załogowa kapsuły Dragon do ISS, realizowana w ramach programu Commercial Crew NASA.",
        wikiUrl: "https://en.wikipedia.org/wiki/SpaceX_Crew-12",
    },
};

export function getMissionInfo(spacecraft: string): MissionInfo | null {
    return missionPatches[spacecraft] ?? null;
}
