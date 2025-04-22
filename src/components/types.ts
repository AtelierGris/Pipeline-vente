export interface ProjectInfo {
    projectName: string;
    clientName: string;
    date: string;
    projectAddress: string;
}

export type FinishType = 'Aucun fini' | 'Powdercoat' | 'Placage';

export type PowdercoatColor = 'Noir' | 'Blanc' | 'Gris' | 'Bronze';
export type PlacageColor = 'Naturel' | 'Noir' | 'Bronze';

export type ParcloseType = 'Carré 3/8' | 'Carré 1/2' | 'L 1/2' | 'L 3/4';

export interface EstimateItem {
    id: string;
    name: string;
    type: ItemType;
    width: number;
    height: number;
    isArched: boolean;
    archHeight?: number;
    quantity: number;
    frameMaterial: FrameMaterial;
    horizontalSeparators: number;
    verticalSeparators: number;
    useFlatSeparators: boolean;
    glassType: string;
    finish: FinishType;
    finishColor: PowdercoatColor | PlacageColor | '';
    needsMeasurement: boolean;
    needsInstallation: boolean;
    squareFootage: number;
    materialCost: number;
    totalCost: number;
    pricePerSqFt?: number;
    extraCosts?: number;
    installationCosts?: number;
    parcloseType: ParcloseType;
    enApplique: boolean;
}

export type ItemType = 'Partition' | 'Porte';

export type FrameMaterial = 'HSS 3/4 x 1 1/2' | 'Flat'; 