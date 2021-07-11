import { writable, Writable } from "svelte/store";

export type EmployeeContract = {
    name: string,
    hoursPerWeek: number,
    avatarUrl: string,
    avatarDesc: string,
}

export const employees : EmployeeContract[] = [
    {
        name: 'Simon',
        hoursPerWeek: 32,
        avatarUrl: 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairNotTooLong&accessoriesType=Blank&hairColor=Black&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Side&eyebrowType=Default&mouthType=Twinkle&skinColor=Light',
        avatarDesc: 'Avatar for Simon, with long dark hair, facial hair, and a slight smile, looking to the side',
    },
    {
        name: 'Ash',
        hoursPerWeek: 37.5 / 2,
        avatarUrl: 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairBigHair&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=Blank&clotheType=Hoodie&clotheColor=PastelGreen&eyeType=Default&eyebrowType=UpDown&mouthType=Smile&skinColor=DarkBrown',
        avatarDesc: 'Avatar showing Ash, with long, flowing dark hair, dark-rimmed glasses and, and a big smile. Ash is wearing a green pastel hoodie.',
    },
    {
        name: 'Rob',
        hoursPerWeek: 37.5 / 5,
        avatarUrl: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortRound&accessoriesType=Prescription01&hairColor=SilverGray&facialHairType=BeardMedium&facialHairColor=Red&clotheType=ShirtCrewNeck&clotheColor=Red&eyeType=Happy&eyebrowType=RaisedExcitedNatural&mouthType=Smile&skinColor=Brown',
        avatarDesc: 'Avatar showing Bob, with short grey hair, a reddish beard, and a smile. Bob is wearing a red sweater',
    },
];

export const customEmployee: Writable<EmployeeContract> = writable({
    name: 'Kayla',
    hoursPerWeek: 37.5,
    avatarUrl: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShaggyMullet&accessoriesType=Prescription01&hairColor=PastelPink&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=Pink&graphicType=Bat&eyeType=Squint&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Light',
    avatarDesc: 'Avatar showing Kayla with short pastel pink hair, glasses and wearing a pink top with a with a white Batman logo on it. Kayla is smiling and raising her eyebrow.',
})
