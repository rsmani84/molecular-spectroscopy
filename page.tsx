"use client";
import {useMemo,useState} from "react";
import {Atom,Activity,BookOpen,FileDown,Waves,AudioWaveform,FlaskConical,ChevronRight} from "lucide-react";
type Tab="Overview"|"Theory"|"Hooke's Law"|"Compound Input"|"IR Spectroscopy"|"UV-Visible";
const tabs:Tab[]=["Overview","Theory","Hooke's Law","Compound Input","IR Spectroscopy","UV-Visible"];
const masses:Record<string,number>={H:1.00784,C:12.011,N:14.007,O:15.999,F:18.998,P:30.974,S:32.06,Cl:35.45,Br:79.904,I:126.904};
const pairs=[["H₂","H","H",575],["N₂","N","N",1177],["CO","C","O",1850],["HCl","H","Cl",480],["C=O local bond","C","O",1200]] as const;
const library = [
  {
    "name": "Aniline",
    "smiles": "Nc1ccccc1",
    "formula": "C₆H₇N",
    "ir": [
      {
        "x": 3460,
        "w": 60,
        "h": 0.18
      },
      {
        "x": 3360,
        "w": 60,
        "h": 0.27
      },
      {
        "x": 3030,
        "w": 60,
        "h": 0.36
      },
      {
        "x": 1600,
        "w": 45,
        "h": 0.45
      },
      {
        "x": 1500,
        "w": 45,
        "h": 0.18
      },
      {
        "x": 1290,
        "w": 45,
        "h": 0.27
      },
      {
        "x": 750,
        "w": 45,
        "h": 0.36
      }
    ],
    "uv": [
      {
        "x": 230,
        "w": 18,
        "h": 0.2
      },
      {
        "x": 280,
        "w": 24,
        "h": 0.34
      }
    ],
    "assign": [
      "N–H asymmetric stretch",
      "N–H symmetric stretch",
      "Aromatic C–H stretch",
      "Aromatic C=C stretch",
      "Aromatic ring vibration",
      "C–N stretch",
      "Aromatic C–H out-of-plane"
    ]
  },
  {
    "name": "Benzene",
    "smiles": "c1ccccc1",
    "formula": "C₆H₆",
    "ir": [
      {
        "x": 3060,
        "w": 60,
        "h": 0.27
      },
      {
        "x": 1600,
        "w": 45,
        "h": 0.36
      },
      {
        "x": 1500,
        "w": 45,
        "h": 0.45
      },
      {
        "x": 1030,
        "w": 45,
        "h": 0.18
      },
      {
        "x": 700,
        "w": 45,
        "h": 0.27
      }
    ],
    "uv": [
      {
        "x": 204,
        "w": 18,
        "h": 0.34
      },
      {
        "x": 254,
        "w": 18,
        "h": 0.48
      }
    ],
    "assign": [
      "Aromatic C–H stretch",
      "Aromatic ring stretch",
      "Ring vibration",
      "Ring breathing",
      "Aromatic C–H out-of-plane"
    ]
  },
  {
    "name": "Toluene",
    "smiles": "Cc1ccccc1",
    "formula": "C₇H₈",
    "ir": [
      {
        "x": 3030,
        "w": 60,
        "h": 0.36
      },
      {
        "x": 2920,
        "w": 60,
        "h": 0.45
      },
      {
        "x": 1600,
        "w": 45,
        "h": 0.18
      },
      {
        "x": 1495,
        "w": 45,
        "h": 0.27
      },
      {
        "x": 1450,
        "w": 45,
        "h": 0.36
      },
      {
        "x": 730,
        "w": 45,
        "h": 0.45
      },
      {
        "x": 690,
        "w": 45,
        "h": 0.18
      }
    ],
    "uv": [
      {
        "x": 208,
        "w": 18,
        "h": 0.48
      },
      {
        "x": 261,
        "w": 24,
        "h": 0.62
      }
    ],
    "assign": [
      "Aromatic C–H stretch",
      "CH₃ C–H stretch",
      "Aromatic C=C stretch",
      "Ring vibration",
      "CH₃ bending",
      "Aromatic C–H out-of-plane",
      "Aromatic C–H out-of-plane"
    ]
  },
  {
    "name": "Phenol",
    "smiles": "Oc1ccccc1",
    "formula": "C₆H₆O",
    "ir": [
      {
        "x": 3500,
        "w": 60,
        "h": 0.45
      },
      {
        "x": 3060,
        "w": 60,
        "h": 0.18
      },
      {
        "x": 1600,
        "w": 45,
        "h": 0.27
      },
      {
        "x": 1500,
        "w": 45,
        "h": 0.36
      },
      {
        "x": 1250,
        "w": 45,
        "h": 0.45
      },
      {
        "x": 750,
        "w": 45,
        "h": 0.18
      }
    ],
    "uv": [
      {
        "x": 210,
        "w": 18,
        "h": 0.62
      },
      {
        "x": 270,
        "w": 24,
        "h": 0.2
      }
    ],
    "assign": [
      "O–H stretch",
      "Aromatic C–H stretch",
      "Aromatic C=C stretch",
      "Ring vibration",
      "C–O stretch",
      "Aromatic C–H out-of-plane"
    ]
  },
  {
    "name": "Anisole",
    "smiles": "COc1ccccc1",
    "formula": "C₇H₈O",
    "ir": [
      {
        "x": 3060,
        "w": 60,
        "h": 0.18
      },
      {
        "x": 2940,
        "w": 60,
        "h": 0.27
      },
      {
        "x": 1600,
        "w": 45,
        "h": 0.36
      },
      {
        "x": 1500,
        "w": 45,
        "h": 0.45
      },
      {
        "x": 1240,
        "w": 45,
        "h": 0.18
      },
      {
        "x": 1040,
        "w": 45,
        "h": 0.27
      },
      {
        "x": 750,
        "w": 45,
        "h": 0.36
      }
    ],
    "uv": [
      {
        "x": 205,
        "w": 18,
        "h": 0.2
      },
      {
        "x": 270,
        "w": 24,
        "h": 0.34
      }
    ],
    "assign": [
      "Aromatic C–H stretch",
      "CH₃ C–H stretch",
      "Aromatic C=C stretch",
      "Ring vibration",
      "Ar–O–C stretch",
      "C–O stretch",
      "Aromatic C–H out-of-plane"
    ]
  },
  {
    "name": "Ethanol",
    "smiles": "CCO",
    "formula": "C₂H₆O",
    "ir": [
      {
        "x": 3350,
        "w": 60,
        "h": 0.27
      },
      {
        "x": 2970,
        "w": 60,
        "h": 0.36
      },
      {
        "x": 2880,
        "w": 60,
        "h": 0.45
      },
      {
        "x": 1450,
        "w": 45,
        "h": 0.18
      },
      {
        "x": 1050,
        "w": 45,
        "h": 0.27
      }
    ],
    "uv": [
      {
        "x": 205,
        "w": 18,
        "h": 0.34
      }
    ],
    "assign": [
      "O–H stretch",
      "Aliphatic C–H stretch",
      "Aliphatic C–H stretch",
      "CH₂ bending",
      "C–O stretch"
    ]
  },
  {
    "name": "Methanol",
    "smiles": "CO",
    "formula": "CH₄O",
    "ir": [
      {
        "x": 3330,
        "w": 60,
        "h": 0.36
      },
      {
        "x": 2940,
        "w": 60,
        "h": 0.45
      },
      {
        "x": 1450,
        "w": 45,
        "h": 0.18
      },
      {
        "x": 1030,
        "w": 45,
        "h": 0.27
      }
    ],
    "uv": [
      {
        "x": 205,
        "w": 18,
        "h": 0.48
      }
    ],
    "assign": [
      "O–H stretch",
      "C–H stretch",
      "CH₃ bending",
      "C–O stretch"
    ]
  },
  {
    "name": "Acetone",
    "smiles": "CC(=O)C",
    "formula": "C₃H₆O",
    "ir": [
      {
        "x": 3000,
        "w": 60,
        "h": 0.45
      },
      {
        "x": 1715,
        "w": 45,
        "h": 0.18
      },
      {
        "x": 1420,
        "w": 45,
        "h": 0.27
      },
      {
        "x": 1220,
        "w": 45,
        "h": 0.36
      }
    ],
    "uv": [
      {
        "x": 190,
        "w": 18,
        "h": 0.62
      },
      {
        "x": 275,
        "w": 24,
        "h": 0.2
      }
    ],
    "assign": [
      "C–H stretch",
      "C=O stretch",
      "CH₃ bending",
      "C–C/C–O fingerprint"
    ]
  },
  {
    "name": "Acetic acid",
    "smiles": "CC(=O)O",
    "formula": "C₂H₄O₂",
    "ir": [
      {
        "x": 3000,
        "w": 60,
        "h": 0.18
      },
      {
        "x": 1710,
        "w": 45,
        "h": 0.27
      },
      {
        "x": 1420,
        "w": 45,
        "h": 0.36
      },
      {
        "x": 1280,
        "w": 45,
        "h": 0.45
      },
      {
        "x": 1180,
        "w": 45,
        "h": 0.18
      }
    ],
    "uv": [
      {
        "x": 205,
        "w": 18,
        "h": 0.2
      }
    ],
    "assign": [
      "Carboxylic acid O–H",
      "C=O stretch",
      "O–H bending",
      "C–O stretch",
      "C–O stretch"
    ]
  },
  {
    "name": "Formaldehyde",
    "smiles": "C=O",
    "formula": "CH₂O",
    "ir": [
      {
        "x": 2850,
        "w": 60,
        "h": 0.27
      },
      {
        "x": 1745,
        "w": 45,
        "h": 0.36
      },
      {
        "x": 1500,
        "w": 45,
        "h": 0.45
      },
      {
        "x": 1160,
        "w": 45,
        "h": 0.18
      }
    ],
    "uv": [
      {
        "x": 210,
        "w": 18,
        "h": 0.34
      },
      {
        "x": 285,
        "w": 24,
        "h": 0.48
      }
    ],
    "assign": [
      "C–H stretch",
      "C=O stretch",
      "CH₂ bending",
      "C–O-related vibration"
    ]
  },
  {
    "name": "Ethyl acetate",
    "smiles": "CCOC(=O)C",
    "formula": "C₄H₈O₂",
    "ir": [
      {
        "x": 2980,
        "w": 60,
        "h": 0.36
      },
      {
        "x": 1740,
        "w": 45,
        "h": 0.45
      },
      {
        "x": 1450,
        "w": 45,
        "h": 0.18
      },
      {
        "x": 1240,
        "w": 45,
        "h": 0.27
      },
      {
        "x": 1050,
        "w": 45,
        "h": 0.36
      }
    ],
    "uv": [
      {
        "x": 205,
        "w": 18,
        "h": 0.48
      }
    ],
    "assign": [
      "C–H stretch",
      "Ester C=O stretch",
      "CH₃ bending",
      "C–O stretch",
      "C–O stretch"
    ]
  },
  {
    "name": "Acetonitrile",
    "smiles": "CC#N",
    "formula": "C₂H₃N",
    "ir": [
      {
        "x": 3000,
        "w": 60,
        "h": 0.45
      },
      {
        "x": 2250,
        "w": 60,
        "h": 0.18
      },
      {
        "x": 1450,
        "w": 45,
        "h": 0.27
      },
      {
        "x": 1050,
        "w": 45,
        "h": 0.36
      }
    ],
    "uv": [
      {
        "x": 190,
        "w": 18,
        "h": 0.62
      }
    ],
    "assign": [
      "C–H stretch",
      "C≡N stretch",
      "CH₃ bending",
      "C–C vibration"
    ]
  },
  {
    "name": "Benzaldehyde",
    "smiles": "O=Cc1ccccc1",
    "formula": "C₇H₆O",
    "ir": [
      {
        "x": 3060,
        "w": 60,
        "h": 0.18
      },
      {
        "x": 2820,
        "w": 60,
        "h": 0.27
      },
      {
        "x": 1700,
        "w": 45,
        "h": 0.36
      },
      {
        "x": 1600,
        "w": 45,
        "h": 0.45
      },
      {
        "x": 1450,
        "w": 45,
        "h": 0.18
      },
      {
        "x": 750,
        "w": 45,
        "h": 0.27
      }
    ],
    "uv": [
      {
        "x": 245,
        "w": 18,
        "h": 0.2
      },
      {
        "x": 320,
        "w": 24,
        "h": 0.34
      }
    ],
    "assign": [
      "Aromatic C–H stretch",
      "Aldehyde C–H stretch",
      "C=O stretch",
      "Aromatic C=C stretch",
      "Ring vibration",
      "Aromatic C–H out-of-plane"
    ]
  },
  {
    "name": "Nitrobenzene",
    "smiles": "O=[N+]([O-])c1ccccc1",
    "formula": "C₆H₅NO₂",
    "ir": [
      {
        "x": 3100,
        "w": 60,
        "h": 0.27
      },
      {
        "x": 1530,
        "w": 45,
        "h": 0.36
      },
      {
        "x": 1350,
        "w": 45,
        "h": 0.45
      },
      {
        "x": 750,
        "w": 45,
        "h": 0.18
      }
    ],
    "uv": [
      {
        "x": 250,
        "w": 18,
        "h": 0.34
      },
      {
        "x": 330,
        "w": 24,
        "h": 0.48
      }
    ],
    "assign": [
      "Aromatic C–H stretch",
      "NO₂ asymmetric stretch",
      "NO₂ symmetric stretch",
      "Aromatic C–H out-of-plane"
    ]
  },
  {
    "name": "Pyridine",
    "smiles": "n1ccccc1",
    "formula": "C₅H₅N",
    "ir": [
      {
        "x": 3050,
        "w": 60,
        "h": 0.36
      },
      {
        "x": 1580,
        "w": 45,
        "h": 0.45
      },
      {
        "x": 1470,
        "w": 45,
        "h": 0.18
      },
      {
        "x": 1210,
        "w": 45,
        "h": 0.27
      },
      {
        "x": 750,
        "w": 45,
        "h": 0.36
      }
    ],
    "uv": [
      {
        "x": 195,
        "w": 18,
        "h": 0.48
      },
      {
        "x": 255,
        "w": 18,
        "h": 0.62
      }
    ],
    "assign": [
      "Aromatic C–H stretch",
      "Ring stretch",
      "Ring stretch",
      "C–N vibration",
      "Ring deformation"
    ]
  },
  {
    "name": "Aniline hydrochloride",
    "smiles": "[Cl-].[NH3+]c1ccccc1",
    "formula": "C₆H₈ClN",
    "ir": [
      {
        "x": 3200,
        "w": 60,
        "h": 0.45
      },
      {
        "x": 3000,
        "w": 60,
        "h": 0.18
      },
      {
        "x": 1600,
        "w": 45,
        "h": 0.27
      },
      {
        "x": 1490,
        "w": 45,
        "h": 0.36
      },
      {
        "x": 1280,
        "w": 45,
        "h": 0.45
      }
    ],
    "uv": [
      {
        "x": 225,
        "w": 18,
        "h": 0.62
      }
    ],
    "assign": [
      "N–H stretching envelope",
      "N–H stretching",
      "Aromatic C=C stretch",
      "Ring vibration",
      "C–N vibration"
    ]
  },
  {
    "name": "Water",
    "smiles": "O",
    "formula": "H₂O",
    "ir": [
      {
        "x": 3650,
        "w": 60,
        "h": 0.18
      },
      {
        "x": 3550,
        "w": 60,
        "h": 0.27
      },
      {
        "x": 1640,
        "w": 45,
        "h": 0.36
      }
    ],
    "uv": [
      {
        "x": 190,
        "w": 18,
        "h": 0.2
      }
    ],
    "assign": [
      "O–H asymmetric stretch",
      "O–H symmetric stretch",
      "H–O–H bending"
    ]
  },
  {
    "name": "Ammonia",
    "smiles": "N",
    "formula": "NH₃",
    "ir": [
      {
        "x": 3335,
        "w": 60,
        "h": 0.27
      },
      {
        "x": 3440,
        "w": 60,
        "h": 0.36
      },
      {
        "x": 1625,
        "w": 45,
        "h": 0.45
      },
      {
        "x": 950,
        "w": 45,
        "h": 0.18
      }
    ],
    "uv": [
      {
        "x": 200,
        "w": 18,
        "h": 0.34
      }
    ],
    "assign": [
      "N–H asymmetric stretch",
      "N–H symmetric stretch",
      "H–N–H bending",
      "Umbrella mode"
    ]
  },
  {
    "name": "Carbon dioxide",
    "smiles": "O=C=O",
    "formula": "CO₂",
    "ir": [
      {
        "x": 2349,
        "w": 60,
        "h": 0.36
      },
      {
        "x": 667,
        "w": 45,
        "h": 0.45
      }
    ],
    "uv": [
      {
        "x": 200,
        "w": 18,
        "h": 0.48
      }
    ],
    "assign": [
      "Asymmetric O=C=O stretch",
      "Bending mode"
    ]
  },
  {
    "name": "Sulfur dioxide",
    "smiles": "O=S=O",
    "formula": "SO₂",
    "ir": [
      {
        "x": 1360,
        "w": 45,
        "h": 0.45
      },
      {
        "x": 1150,
        "w": 45,
        "h": 0.18
      },
      {
        "x": 520,
        "w": 45,
        "h": 0.27
      }
    ],
    "uv": [
      {
        "x": 220,
        "w": 18,
        "h": 0.62
      }
    ],
    "assign": [
      "Asymmetric S=O stretch",
      "Symmetric S=O stretch",
      "Bending mode"
    ]
  },
  {
    "name": "Chloroform",
    "smiles": "ClC(Cl)Cl",
    "formula": "CHCl₃",
    "ir": [
      {
        "x": 3020,
        "w": 60,
        "h": 0.18
      },
      {
        "x": 1215,
        "w": 45,
        "h": 0.27
      },
      {
        "x": 760,
        "w": 45,
        "h": 0.36
      },
      {
        "x": 670,
        "w": 45,
        "h": 0.45
      }
    ],
    "uv": [
      {
        "x": 260,
        "w": 24,
        "h": 0.2
      }
    ],
    "assign": [
      "C–H stretch",
      "C–H bending/C–Cl",
      "C–Cl stretch",
      "C–Cl vibration"
    ]
  },
  {
    "name": "Cyclohexane",
    "smiles": "C1CCCCC1",
    "formula": "C₆H₁₂",
    "ir": [
      {
        "x": 2930,
        "w": 60,
        "h": 0.27
      },
      {
        "x": 2855,
        "w": 60,
        "h": 0.36
      },
      {
        "x": 1450,
        "w": 45,
        "h": 0.45
      },
      {
        "x": 1260,
        "w": 45,
        "h": 0.18
      }
    ],
    "uv": [
      {
        "x": 205,
        "w": 18,
        "h": 0.34
      }
    ],
    "assign": [
      "Aliphatic C–H stretch",
      "Aliphatic C–H stretch",
      "CH₂ bending",
      "Ring vibration"
    ]
  },
  {
    "name": "Ethylene",
    "smiles": "C=C",
    "formula": "C₂H₄",
    "ir": [
      {
        "x": 3100,
        "w": 60,
        "h": 0.36
      },
      {
        "x": 1620,
        "w": 45,
        "h": 0.45
      },
      {
        "x": 950,
        "w": 45,
        "h": 0.18
      }
    ],
    "uv": [
      {
        "x": 165,
        "w": 18,
        "h": 0.48
      }
    ],
    "assign": [
      "=C–H stretch",
      "C=C stretch",
      "Out-of-plane =C–H bend"
    ]
  },
  {
    "name": "1-Hexene",
    "smiles": "C=CCCCC",
    "formula": "C₆H₁₂",
    "ir": [
      {
        "x": 3080,
        "w": 60,
        "h": 0.45
      },
      {
        "x": 2960,
        "w": 60,
        "h": 0.18
      },
      {
        "x": 1640,
        "w": 45,
        "h": 0.27
      },
      {
        "x": 990,
        "w": 45,
        "h": 0.36
      },
      {
        "x": 910,
        "w": 45,
        "h": 0.45
      }
    ],
    "uv": [
      {
        "x": 180,
        "w": 18,
        "h": 0.62
      }
    ],
    "assign": [
      "=C–H stretch",
      "Aliphatic C–H stretch",
      "C=C stretch",
      "Terminal alkene =C–H bend",
      "Terminal alkene =C–H bend"
    ]
  },
  {
    "name": "Urea",
    "smiles": "NC(=O)N",
    "formula": "CH₄N₂O",
    "ir": [
      {
        "x": 3450,
        "w": 60,
        "h": 0.18
      },
      {
        "x": 3350,
        "w": 60,
        "h": 0.27
      },
      {
        "x": 1680,
        "w": 45,
        "h": 0.36
      },
      {
        "x": 1600,
        "w": 45,
        "h": 0.45
      },
      {
        "x": 1450,
        "w": 45,
        "h": 0.18
      }
    ],
    "uv": [
      {
        "x": 205,
        "w": 18,
        "h": 0.2
      }
    ],
    "assign": [
      "N–H stretch",
      "N–H stretch",
      "C=O stretch",
      "NH₂ bending",
      "C–N vibration"
    ]
  },
  {
    "name": "Glycine",
    "smiles": "NCC(=O)O",
    "formula": "C₂H₅NO₂",
    "ir": [
      {
        "x": 3200,
        "w": 60,
        "h": 0.27
      },
      {
        "x": 1600,
        "w": 45,
        "h": 0.36
      },
      {
        "x": 1410,
        "w": 45,
        "h": 0.45
      },
      {
        "x": 1320,
        "w": 45,
        "h": 0.18
      }
    ],
    "uv": [
      {
        "x": 220,
        "w": 18,
        "h": 0.34
      }
    ],
    "assign": [
      "N–H/O–H stretching",
      "Asymmetric COO⁻ stretch",
      "Symmetric COO⁻ stretch",
      "C–N vibration"
    ]
  }
] as const;
const examples = library.map(c=>[c.name,c.smiles,c.formula] as const);
function compoundProfile(name:string, smiles:string){
 const item=library.find(c=>c.name.toLowerCase()===name.trim().toLowerCase()) || library.find(c=>c.smiles.toLowerCase()===smiles.trim().toLowerCase());
 return item ? {...item,label:item.name} : {label:"Select a library compound",ir:[],uv:[],assign:[]};
}
function Spectrum({ir,absorbance,name,smiles}:{ir:boolean,absorbance:boolean,name:string,smiles:string}){
 const profile=compoundProfile(name,smiles);
 const pts=useMemo(()=>Array.from({length:720},(_,i)=>{const x=ir?4000-i/719*3600:200+i/719*500;const g=(c:number,w:number,h:number)=>h*Math.exp(-.5*((x-c)/w)**2);const peaks=ir?profile.ir:profile.uv;const ab=peaks.reduce((sum,v)=>sum+g(v.x,v.w,v.h),0);return{x,y:absorbance?ab:100*(1-ab)};}),[ir,absorbance,name,smiles]);
 const W=820,H=310,p=60,max=absorbance?1:100;
 const path=pts.map((v,i)=>`${i?"L":"M"}${p+i/(pts.length-1)*(W-2*p)},${H-p-v.y/max*(H-2*p)}`).join(" ");
 const ticks=ir?[4000,3600,3200,2800,2400,2000,1600,1200,800,400]:[200,250,300,350,400,450,500,550,600,650,700];
 return <svg viewBox={`0 0 ${W} ${H}`} className="spectrum" role="img" aria-label={`${profile.label} ${ir?"illustrative IR":"illustrative UV-visible"} spectrum`}>
 {[0,.25,.5,.75,1].map(t=><g key={t}><line x1={p} x2={W-p} y1={H-p-t*(H-2*p)} y2={H-p-t*(H-2*p)} stroke="#e5eaf2" strokeDasharray="4 5"/><text x={p-12} y={H-p-t*(H-2*p)+4} textAnchor="end" fontSize="11" fill="#66758b">{Math.round(t*max)}</text></g>)}
 <path d={path} fill="none" stroke={ir?"#2563c7":"#7c3aed"} strokeWidth="2.8"/><line x1={p} x2={W-p} y1={H-p} y2={H-p} stroke="#64748b"/>
 {ticks.map(v=>{const x=ir?p+(4000-v)/3600*(W-2*p):p+(v-200)/500*(W-2*p);return <g key={v}><line x1={x} x2={x} y1={H-p} y2={H-p+5} stroke="#64748b"/><text x={x} y={H-p+20} textAnchor="middle" fontSize="10" fill="#64748b">{v}</text></g>})}
 <text x={W/2} y={H-8} textAnchor="middle" fontSize="13" fill="#42536d">{ir?"Wavenumber (cm⁻¹)":"Wavelength (nm)"}</text><text x="14" y="20" fontSize="11" fill="#64748b">{ir?(absorbance?"Absorbance":"Transmittance (%T)"):"Relative absorbance (a.u.)"}</text></svg>
}
function ModeIllustration(){return <svg viewBox="0 0 900 360" className="theory-image" role="img" aria-label="Six IR vibrational modes"><defs><marker id="arr" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#2563c7"/></marker></defs>{[0,1,2,3,4,5].map((i)=>{const x=75+i*150,y=105;const isStretch=i<2;return <g key={i}><line x1={x-28} y1={y-22} x2={x} y2={y+12} stroke="#6b7280" strokeWidth="8"/><line x1={x+28} y1={y-22} x2={x} y2={y+12} stroke="#6b7280" strokeWidth="8"/><circle cx={x} cy={y+12} r="18" fill="#d65b45" stroke="#a33"/><circle cx={x-28} cy={y-22} r="12" fill="#397bd8"/><circle cx={x+28} cy={y-22} r="12" fill="#397bd8"/>{isStretch?<><path d={i===0?`M${x-28} ${y-44} l0 -18 M${x+28} ${y-44} l0 -18`:`M${x-28} ${y-44} l0 18 M${x+28} ${y-44} l0 -18`} stroke="#2563c7" strokeWidth="3" markerEnd="url(#arr)" fill="none"/></>:<><path d={`M${x-48} ${y-15} q-25 -25 -5 -42 M${x+48} ${y-15} q25 -25 5 -42`} stroke="#2563c7" strokeWidth="3" fill="none" markerEnd="url(#arr)"/></>}<text x={x} y="205" textAnchor="middle" fontSize="16" fontWeight="700" fill="#263b5b">{["Symmetric stretch","Asymmetric stretch","Scissoring","Rocking","Wagging","Twisting"][i]}</text><text x={x} y="229" textAnchor="middle" fontSize="12" fill="#66758b">{i<2?"Stretching":i<4?"In-plane bend":"Out-of-plane bend"}</text></g>})}</svg>}
function InstrumentDiagram({uv}:{uv:boolean}){const labels=uv?["Light source","Monochromator","Slit","Sample cuvette","Detector","Display"]:["IR source","Interferometer","Sample","Detector","Computer"];return <svg viewBox={`0 0 ${uv?900:760} 180`} className="instrument-image" role="img" aria-label={uv?"UV-visible spectrophotometer block diagram":"FTIR spectrometer block diagram"}>{labels.map((l,i)=>{const x=45+i*(uv?145:140);return <g key={l}><rect x={x} y="35" width="94" height="58" rx="9" fill={i%2?"#e9f1ff":"#fff2cf"} stroke="#7d9bc6" strokeWidth="2"/><circle cx={x+47} cy="64" r="15" fill={i===0?"#f6c84c":i===labels.length-1?"#7c9cc8":"#72b8d6"}/><text x={x+47} y="122" textAnchor="middle" fontSize="13" fill="#344866">{l}</text>{i<labels.length-1&&<path d={`M${x+98} 64 h${uv?42:62} m-8 -7 l8 7 -8 7`} stroke="#3568ad" strokeWidth="3" fill="none"/>}</g>})}</svg>}
export default function Page(){const [tab,setTab]=useState<Tab>("Overview"),[pair,setPair]=useState(0),[a,setA]=useState("H"),[b,setB]=useState("H"),[k,setK]=useState(575),[name,setName]=useState("Aniline"),[smiles,setSmiles]=useState("Nc1ccccc1"),[compoundInfo,setCompoundInfo]=useState<any>(null),[lookupMsg,setLookupMsg]=useState(""),[loading,setLoading]=useState(false),[axis,setAxis]=useState("transmittance");const mu=(masses[a]??1)*(masses[b]??1)/((masses[a]??1)+(masses[b]??1));const wn=Math.sqrt(k/(mu*1.6605390666e-27))/(2*Math.PI*2.99792458e10);
async function lookup(mode:"name"|"smiles"){const q=(mode==="name"?name:smiles).trim();if(!q){setLookupMsg("Enter a compound name or SMILES first.");return;}setLoading(true);setLookupMsg("Searching PubChem…");setCompoundInfo(null);try{const url=`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/${mode}/${encodeURIComponent(q)}/property/MolecularFormula,MolecularWeight,IUPACName,CanonicalSMILES/JSON`;const res=await fetch(url);if(!res.ok)throw new Error("No PubChem record found. Check the input and try again.");const data=await res.json(),p=data.PropertyTable.Properties[0];setCompoundInfo(p);if(p.CanonicalSMILES)setSmiles(p.CanonicalSMILES);if(mode==="smiles" && p.IUPACName)setName(p.IUPACName);setLookupMsg("Compound identified successfully using PubChem.");}catch(e:any){setLookupMsg(e.message||"Lookup failed.");}finally{setLoading(false);}}
function setExample(n:string){const c=examples.find(x=>x[0]===n);if(c){setName(c[0]);setSmiles(c[1]);setCompoundInfo(null);setLookupMsg("Library compound selected. IR and UV-visible teaching spectra update automatically.");}}
const icons=[<BookOpen/>,<BookOpen/>,<Activity/>,<Waves/>,<AudioWaveform/>,<Atom/>];const logoUrl="/srmist-logo.jpeg";
return <main className="shell"><aside className="sidebar"><div className="brand"><span className="brandicon"><Atom/></span><span><b>Molecular Spectroscopy</b><small>Virtual Laboratory</small></span></div><div className="navlabel">LABORATORY</div>{tabs.map((t,i)=><button key={t} className={`nav ${tab===t?"active":""}`} onClick={()=>setTab(t)}>{icons[i]}{t}<ChevronRight className="arrow"/></button>)}<div className="sidefoot">Open access for students<br/>Faculty tools: protected access planned</div></aside><section className="main"><header className="top"><div><div className="eyebrow">CHEMISTRY • INTERACTIVE LEARNING</div><h1>{tab==="Overview"?"Molecular Spectroscopy Virtual Laboratory":tab}</h1><p>Hooke's Law · Infrared · UV-Visible spectroscopy</p></div><img className="collegeLogo" src={logoUrl} alt="SRM Institute of Science and Technology logo" onError={e=>{e.currentTarget.style.display="none"}}/></header><div className="toolbar screenOnly"><button className="reportBtn" onClick={()=>window.print()}><FileDown size={16}/> Generate / Print Report</button><span>Choose “Save as PDF” in the print dialog.</span></div>
{tab==="Overview"&&<><section className="hero"><div><div className="eyebrow light">MOLECULAR SPECTROSCOPY LAB</div><h2>Explore molecular vibrations and electronic spectra.</h2><p>Investigate bond stiffness, vibrational frequencies, IR absorption and UV-visible transitions through interactive chemistry learning tools.</p><button className="primary" onClick={()=>setTab("Hooke's Law")}>Start experiment <ChevronRight size={16}/></button></div><div className="heroart"><div className="orb">M</div><span>IR · UV · VIBRATIONS</span></div></section><div className="cards">{[["Hooke's Law","Reduced mass, force constant and vibrational frequency",Activity,"Hooke's Law"],["IR Spectroscopy","Wavenumber and transmittance spectra",Waves,"IR Spectroscopy"],["UV-Visible","Electronic transitions and absorption spectra",AudioWaveform,"UV-Visible"],["Compound Input","Name or SMILES lookup and molecular information",FlaskConical,"Compound Input"]].map(([title,desc,Icon,target]:any)=><button className="module" key={title} onClick={()=>setTab(target)}><span><Icon/></span><b>{title}</b><small>{desc}</small><em>Open module →</em></button>)}</div>
<section className="panel overview-theory"><h2>IR modes of molecular vibration</h2><ModeIllustration/><p>Molecular vibrations are classified as stretching and bending. Stretching changes bond lengths; bending changes bond angles while bond lengths remain relatively constant.</p><div className="mode-grid">
<article><b>Symmetric stretching</b><p>Both outer atoms move toward or away from the central atom together.</p></article>
<article><b>Asymmetric stretching</b><p>One outer atom moves toward the central atom while the other moves away.</p></article>
<article><b>Scissoring (in-plane)</b><p>Two atoms approach each other and then move apart in a scissor-like motion.</p></article>
<article><b>Rocking (in-plane)</b><p>Two atoms swing back and forth together in the same direction within the molecular plane.</p></article>
<article><b>Wagging (out-of-plane)</b><p>Both atoms move out of the molecular plane together, toward and away from the observer.</p></article>
<article><b>Twisting (out-of-plane)</b><p>One atom moves toward the observer while the other moves away, in opposite directions.</p></article>
</div><p className="notice">Bending modes generally require less energy and occur at lower wavenumbers than stretching modes. Scissoring and rocking are in-plane; wagging and twisting are out-of-plane.</p><h3>FTIR instrumentation</h3><InstrumentDiagram uv={false}/></section>
<section className="panel overview-theory"><h2>UV-visible spectroscopy fundamentals</h2><p>UV-visible absorption promotes electrons from lower to higher electronic energy levels. Common transitions include σ → σ*, n → σ*, π → π* and n → π*. Greater conjugation often reduces the energy gap and shifts absorption to longer wavelengths.</p>
<div className="formula"><b>Beer–Lambert law</b><p>A = εcl</p><small>A = absorbance; ε = molar absorptivity; c = concentration; l = optical path length. Absorbance is proportional to concentration and path length for suitable dilute solutions.</small></div>
<div className="formula"><b>Photon energy</b><p>ΔE = hν = hc/λ</p><small>A larger energy gap corresponds to a shorter absorption wavelength; a smaller gap corresponds to a longer wavelength.</small></div><h3>UV-visible spectrophotometer instrumentation</h3><InstrumentDiagram uv/></section></>}
{tab==="Theory"&&<section className="panel theory"><h2>Fundamentals of Molecular Spectroscopy</h2><h3>1. Hooke's law and molecular vibration</h3><p>A chemical bond can be approximated as a spring connecting two atoms. For small displacements, the restoring force is proportional to displacement: F = −kx. A larger force constant gives a higher vibrational frequency, while a larger reduced mass gives a lower frequency.</p><svg viewBox="0 0 700 145" className="theory-image" role="img" aria-label="Two atoms connected by a spring illustrating Hookes law"><circle cx="160" cy="65" r="28" fill="#3479d2"/><circle cx="530" cy="65" r="28" fill="#df8b32"/><path d="M188 65 h22 l12 -20 20 40 20 -40 20 40 20 -40 20 40 20 -40 20 40 20 -40 20 20 h48" stroke="#526b91" strokeWidth="6" fill="none"/><path d="M160 110 v18 M530 110 v18" stroke="#60728d" strokeWidth="2"/><text x="160" y="137" textAnchor="middle" fontSize="15" fill="#42536d">m₁</text><text x="530" y="137" textAnchor="middle" fontSize="15" fill="#42536d">m₂</text><text x="345" y="25" textAnchor="middle" fontSize="17" fill="#244b91">Bond force constant, k</text></svg><div className="formula"><b>Harmonic oscillator</b><p>ν̄ = (1 / 2πc) √(k / μ) ; μ = (m₁m₂)/(m₁+m₂)</p><small>ν̄: wavenumber; c: speed of light; k: force constant; μ: reduced mass.</small></div><h3>2. IR modes of molecular vibration</h3><ModeIllustration/><p>IR absorption occurs when radiation matches a vibrational transition and the vibration produces a change in dipole moment. A molecule has 3N−6 normal modes if non-linear and 3N−5 if linear.</p><ul><li><b>Stretching:</b> bond length changes; symmetric or asymmetric stretching.</li><li><b>Bending:</b> bond angle changes; scissoring, rocking, wagging and twisting.</li><li><b>IR plot:</b> wavenumber (cm⁻¹), descending from about 4000 to 400, against % transmittance or absorbance.</li></ul><h3>IR instrumentation: FTIR spectrometer</h3><InstrumentDiagram uv={false}/><h3>3. UV-visible spectroscopy fundamentals</h3><p>UV-visible absorption promotes electrons to higher electronic energy levels. Common transitions are σ→σ*, n→σ*, π→π* and n→π*. Conjugation often lowers the energy gap and shifts absorption toward longer wavelength.</p><div className="formula"><b>Photon energy and Beer–Lambert law</b><p>ΔE = hν = hc/λ &nbsp; | &nbsp; A = εcl</p><small>Absorbance A depends on molar absorptivity ε, concentration c and path length l.</small></div><h3>UV-visible spectrophotometer instrumentation</h3><InstrumentDiagram uv/><p className="notice">Spectral positions depend on molecular structure, phase, solvent, temperature and instrument conditions.</p></section>}
{tab==="Hooke's Law"&&<section className="panel"><div className="panelhead"><div><h2>Hooke's Law: diatomic oscillator</h2><p>Change atomic masses and bond force constant to explore the harmonic oscillator.</p></div><span className="tag">LIVE CALCULATION</span></div><label className="field">Reference pair<select value={pair} onChange={e=>{const i=+e.target.value;setPair(i);setA(pairs[i][1]);setB(pairs[i][2]);setK(pairs[i][3]);}}>{pairs.map((v,i)=><option value={i} key={v[0]}>{v[0]}</option>)}</select></label><div className="two"><label className="field">Atom A<select value={a} onChange={e=>setA(e.target.value)}>{Object.keys(masses).map(x=><option key={x}>{x}</option>)}</select><small>Atomic mass: {masses[a]} u</small></label><label className="field">Atom B<select value={b} onChange={e=>setB(e.target.value)}>{Object.keys(masses).map(x=><option key={x}>{x}</option>)}</select><small>Atomic mass: {masses[b]} u</small></label></div><label className="field">Force constant: <b>{k} N m⁻¹</b><input type="range" min="100" max="2500" step="5" value={k} onChange={e=>setK(+e.target.value)}/></label><div className="vibration"><div className="ball blue">{a}</div><div className="spring"></div><div className="ball orange">{b}</div></div><div className="results"><div><small>Reduced mass</small><b>{mu.toFixed(4)} u</b></div><div><small>Wavenumber</small><b>{wn.toFixed(1)} cm⁻¹</b></div><div><small>Frequency</small><b>{(wn*2.99792458e10/1e12).toFixed(2)} THz</b></div></div><div className="formula"><b>Harmonic oscillator equations</b><p>ν̄ = (1 / 2πc) √(k / μ)</p><p>μ = (m₁m₂) / (m₁ + m₂)</p><small>Approximation for a diatomic bond. Polyatomic normal modes may be coupled and anharmonic.</small></div></section>}
{tab==="IR Spectroscopy"&&<section className="panel"><div className="panelhead"><div><h2>Infrared spectrum: {compoundInfo?.IUPACName || name || "Selected compound"}</h2><p>X-axis: wavenumber (cm⁻¹), descending 4000 → 400. Y-axis: % transmittance or absorbance.</p></div><span className="tag teal">TEACHING MODEL</span></div><label className="field">Select compound from library<select value={name} onChange={e=>setExample(e.target.value)}>{examples.map(c=><option key={c[0]} value={c[0]}>{c[0]}</option>)}</select></label><label className="field">Vertical axis<select value={axis} onChange={e=>setAxis(e.target.value)}><option value="transmittance">Percent transmittance (%T)</option><option value="absorbance">Absorbance (a.u.)</option></select></label><Spectrum ir absorbance={axis==="absorbance"} name={name} smiles={smiles}/><div className="tablewrap"><table><thead><tr><th>Approx. wavenumber (cm⁻¹)</th><th>Illustrative assignment</th></tr></thead><tbody>{compoundProfile(name,smiles).ir.map((v,i)=><tr key={i}><td>{Math.round(v.x)} cm⁻¹</td><td>{compoundProfile(name,smiles).assign[i] || "Molecular vibration"}</td></tr>)}</tbody></table></div><p className="notice">Illustrative, structure-class-based teaching simulation. Peak positions are approximate reference bands, not experimental measurements or DFT-calculated normal modes.</p></section>}
{tab==="UV-Visible"&&<section className="panel"><div className="panelhead"><div><h2>UV-visible absorption spectrum: {compoundInfo?.IUPACName || name || "Selected compound"}</h2><p>Electronic transitions and absorption in the UV and visible regions.</p></div><span className="tag purple">TEACHING MODEL</span></div><label className="field">Select compound from library<select value={name} onChange={e=>setExample(e.target.value)}>{examples.map(c=><option key={c[0]} value={c[0]}>{c[0]}</option>)}</select></label><Spectrum ir={false} absorbance name={name} smiles={smiles}/><div className="formula"><b>Fundamental relationships</b><p>ΔE = hν = hc/λ &nbsp; | &nbsp; A = εcl</p><small>Typical transitions: σ→σ*, n→σ*, π→π* and n→π*. Conjugation can shift absorption to longer wavelengths.</small></div><p className="notice">Illustrative transition envelope selected from simple structure-class rules. It is not an experimental spectrum or TDDFT prediction; accurate λmax requires reference data or an excited-state calculation.</p></section>}
{tab==="Compound Input"&&<section className="panel"><h2>Compound Spectrum Library</h2><p>Select one of the 26 compounds. Its name, SMILES, reference IR bands, UV-visible teaching profile and assignments are linked in the library.</p><label className="field">Choose compound<select value={name} onChange={e=>setExample(e.target.value)}>{examples.map(c=><option key={c[0]} value={c[0]}>{c[0]}</option>)}</select></label><div className="two"><label className="field">Compound name<input value={name} readOnly/></label><label className="field">SMILES notation<input value={smiles} readOnly/></label></div><div className="library-card"><b>{compoundProfile(name,smiles).label}</b><p>Formula: {library.find(c=>c.name===name)?.formula || "—"}</p><p>IR reference bands: {compoundProfile(name,smiles).ir.length}</p><p>UV-visible teaching bands: {compoundProfile(name,smiles).uv.length}</p></div><p className="lookupmsg">{lookupMsg}</p><p className="notice">These are approximate educational reference profiles. They are not measured spectra or DFT/TDDFT calculations. Select IR Spectroscopy or UV-Visible in the sidebar to view the corresponding plots.</p></section>}<footer className="creator"><b>Created by Dr. R. Subramanian</b><br/>Assistant Professor<br/>Division of Chemistry, School of Sciences<br/>Faculty of Engineering and Technology<br/>SRM Institute of Science and Technology<br/>Tiruchirappalli - 6211105, TN, India</footer></section></main>}
