"use client"

import { useState } from 'react';

import {
    Atom,
    Brain,
    Droplet,
    Flame,
    FlaskConical,
    Hexagon,
    TestTube,
    Zap,
} from 'lucide-react';

import MoleculeViewer from '../_components/MoleculeViewer';
import QuizGenerator from '../_components/QuizGenerator';
import ChatBot from '../_components/ChatBot';

const Explore = () => {
    const experiments = [
        {
            id: 1,
            title: 'Xác suất lượng tử',
            icon: <FlaskConical className="w-5 h-5" />,

            iframeUrl: 'https://phet.colorado.edu/sims/html/quantum-coin-toss/latest/quantum-coin-toss_vi.html'
        },
        {
            id: 2,
            title: 'Thí nghiệm lượng tử',
            icon: <Atom className="w-5 h-5" />,

            iframeUrl: 'https://phet.colorado.edu/sims/html/quantum-measurement/latest/quantum-measurement_vi.html'
        },
        {
            id: 3,
            title: 'Mô Hình Hidrogen',
            icon: <Droplet className="w-5 h-5" />,

            iframeUrl: 'https://phet.colorado.edu/sims/html/models-of-the-hydrogen-atom/latest/models-of-the-hydrogen-atom_vi.html'
        },
        {
            id: 4,
            title: 'Chất khí: phần giới thiệu',
            icon: <Flame className="w-5 h-5" />,

            iframeUrl: 'https://phet.colorado.edu/sims/html/gases-intro/latest/gases-intro_vi.html'
        },
        {
            id: 5,
            title: 'Tính chất của chất khí',
            icon: <Zap className="w-5 h-5" />,

            iframeUrl: 'https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties_vi.html'
        },
        {
            id: 6,
            title: 'Năng lượng: các dạng và sự chuyển hoá',
            icon: <TestTube className="w-5 h-5" />,

            iframeUrl: 'https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes_vi.html'
        },
        {
            id: 7,
            title: 'Dung dịch Acid-Base',
            icon: <TestTube className="w-5 h-5" />,

            iframeUrl: 'https://phet.colorado.edu/sims/html/acid-base-solutions/latest/acid-base-solutions_vi.html'
        },
        {
            id: 8,
            title: 'Nồng độ Mol',
            icon: <TestTube className="w-5 h-5" />,

            iframeUrl: 'https://phet.colorado.edu/sims/html/molarity/latest/molarity_vi.html'
        },
        {
            id: 9,
            title: 'Phân Tử Nước (H₂O)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Quan sát cấu trúc 3D của phân tử nước',
            type: '3d',
            moleculeData: {
                type: 'xyz',
                data: `3\nWater molecule\nO 0.000 0.000 0.000\nH 0.757 0.586 0.000\nH -0.757 0.586 0.000`,
                surface: false
            }
        },
        {
            id: 10,
            title: 'Phân Tử Caffeine',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Khám phá cấu trúc phân tử caffeine',
            type: '3d',
            moleculeData: {
                type: 'pdb',
                data: `COMPND    CAFFEINE\nATOM      1  C   CAF     1       1.185   0.531   0.000\nATOM      2  N   CAF     1       0.000   1.258   0.000\nATOM      3  C   CAF     1      -1.185   0.531   0.000\nATOM      4  C   CAF     1      -1.185  -0.869   0.000\nATOM      5  N   CAF     1       0.000  -1.596   0.000\nATOM      6  C   CAF     1       1.185  -0.869   0.000\nATOM      7  N   CAF     1       2.370  -1.596   0.000\nATOM      8  C   CAF     1       2.370  -2.996   0.000\nATOM      9  N   CAF     1      -2.370  -1.596   0.000\nATOM     10  C   CAF     1      -2.370  -2.996   0.000\nATOM     11  O   CAF     1       2.370   1.258   0.000\nATOM     12  O   CAF     1      -2.370   1.258   0.000\nEND`,
                surface: false
            }
        },
        {
            id: 11,
            title: 'Phân Tử Glucose (C₆H₁₂O₆)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Xem cấu trúc 3D của đường glucose',
            type: '3d',
            moleculeData: {
                type: 'pdb',
                data: `COMPND    GLUCOSE
ATOM      1  C1  GLC     1       0.000   0.000   0.000
ATOM      2  C2  GLC     1       1.520   0.000   0.000
ATOM      3  C3  GLC     1       2.030   1.420   0.000
ATOM      4  C4  GLC     1       1.520   2.130   1.240
ATOM      5  C5  GLC     1       0.000   2.130   1.240
ATOM      6  C6  GLC     1      -0.510   3.450   1.240
ATOM      7  O1  GLC     1      -0.510   0.710   1.240
ATOM      8  O2  GLC     1       2.030  -0.710  -1.090
ATOM      9  O3  GLC     1       3.450   1.420   0.000
ATOM     10  O4  GLC     1       1.520   3.550   1.240
ATOM     11  O5  GLC     1      -0.510  -1.310   0.000
ATOM     12  O6  GLC     1      -1.910   3.450   1.240
END`,
                surface: false
            }
        },
        {
            id: 12,
            title: 'CO₂ (Carbon Dioxide)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Phân tử khí carbon dioxide - khí nhà kính',
            type: '3d',
            moleculeData: {
                type: 'xyz',
                data: `3\nCarbon Dioxide\nC 0.000 0.000 0.000\nO 1.160 0.000 0.000\nO -1.160 0.000 0.000`,
                surface: false
            }
        },
        {
            id: 13,
            title: 'Methane (CH₄)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Phân tử metan - khí đốt tự nhiên',
            type: '3d',
            moleculeData: {
                type: 'xyz',
                data: `5\nMethane molecule\nC 0.000 0.000 0.000\nH 0.629 0.629 0.629\nH -0.629 -0.629 0.629\nH -0.629 0.629 -0.629\nH 0.629 -0.629 -0.629`,
                surface: false
            }
        },
        {
            id: 14,
            title: 'Ethanol (C₂H₅OH)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Phân tử cồn ethanol - rượu',
            type: '3d',
            moleculeData: {
                type: 'xyz',
                data: `9\nEthanol molecule\nC 0.000 0.000 0.000\nC 1.520 0.000 0.000\nO 2.030 1.360 0.000\nH -0.380 1.030 0.000\nH -0.380 -0.515 0.890\nH -0.380 -0.515 -0.890\nH 1.900 -0.515 0.890\nH 1.900 -0.515 -0.890\nH 2.980 1.360 0.000`,
                surface: false
            }
        },
        {
            id: 15,
            title: 'Benzene (C₆H₆)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Vòng benzene - hợp chất thơm',
            type: '3d',
            moleculeData: {
                type: 'xyz',
                data: `12\nBenzene ring\nC 1.400 0.000 0.000\nC 0.700 1.212 0.000\nC -0.700 1.212 0.000\nC -1.400 0.000 0.000\nC -0.700 -1.212 0.000\nC 0.700 -1.212 0.000\nH 2.490 0.000 0.000\nH 1.245 2.157 0.000\nH -1.245 2.157 0.000\nH -2.490 0.000 0.000\nH -1.245 -2.157 0.000\nH 1.245 -2.157 0.000`,
                surface: false
            }
        },
        {
            id: 16,
            title: 'Aspirin',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Phân tử aspirin - thuốc giảm đau',
            type: '3d',
            moleculeData: {
                type: 'pdb',
                data: `COMPND    ASPIRIN\nATOM      1  C   ASP     1       0.000   1.400   0.000\nATOM      2  C   ASP     1       1.212   0.700   0.000\nATOM      3  C   ASP     1       1.212  -0.700   0.000\nATOM      4  C   ASP     1       0.000  -1.400   0.000\nATOM      5  C   ASP     1      -1.212  -0.700   0.000\nATOM      6  C   ASP     1      -1.212   0.700   0.000\nATOM      7  C   ASP     1       2.500   1.400   0.000\nATOM      8  O   ASP     1       3.600   0.800   0.000\nATOM      9  O   ASP     1       2.400   2.700   0.000\nATOM     10  C   ASP     1      -2.500   1.400   0.000\nATOM     11  O   ASP     1      -2.500   2.700   0.000\nATOM     12  O   ASP     1      -3.600   0.700   0.000\nATOM     13  C   ASP     1      -4.900   1.400   0.000\nATOM     14  C   ASP     1      -6.000   0.500   0.000\nATOM     15  O   ASP     1      -4.900   2.700   0.000\nEND`,
                surface: false
            }
        },
        {
            id: 17,
            title: 'Ammonia (NH₃)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Phân tử amoniac - chất tẩy rửa',
            type: '3d',
            moleculeData: {
                type: 'xyz',
                data: `4\nAmmonia molecule\nN 0.000 0.000 0.000\nH 0.000 0.940 0.000\nH 0.814 -0.470 0.000\nH -0.814 -0.470 0.000`,
                surface: false
            }
        },
        {
            id: 18,
            title: 'Vitamin C (Ascorbic Acid)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Phân tử vitamin C - chất chống oxy hóa',
            type: '3d',
            moleculeData: {
                type: 'pdb',
                data: `COMPND    VITAMIN C\nATOM      1  C   VTC     1       0.000   0.000   0.000\nATOM      2  C   VTC     1       1.520   0.000   0.000\nATOM      3  C   VTC     1       2.030   1.420   0.000\nATOM      4  C   VTC     1       1.020   2.420   0.000\nATOM      5  C   VTC     1      -0.380   1.920   0.000\nATOM      6  O   VTC     1      -0.880   0.620   0.000\nATOM      7  O   VTC     1       3.350   1.720   0.000\nATOM      8  O   VTC     1       1.320   3.720   0.000\nATOM      9  O   VTC     1      -1.380   2.720   0.000\nATOM     10  C   VTC     1      -0.580  -1.320   0.000\nATOM     11  O   VTC     1      -1.980  -1.420   0.000\nATOM     12  O   VTC     1       0.220  -2.420   0.000\nEND`,
                surface: false
            }
        },
        {
            id: 19,
            title: 'DNA Base - Adenine',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Bazơ nitơ adenine trong DNA',
            type: '3d',
            moleculeData: {
                type: 'pdb',
                data: `COMPND    ADENINE\nATOM      1  N   ADE     1       0.000   0.000   0.000\nATOM      2  C   ADE     1       1.350   0.000   0.000\nATOM      3  N   ADE     1       2.050   1.200   0.000\nATOM      4  C   ADE     1       1.350   2.400   0.000\nATOM      5  C   ADE     1       0.000   2.400   0.000\nATOM      6  C   ADE     1      -0.700   1.200   0.000\nATOM      7  N   ADE     1      -2.050   1.200   0.000\nATOM      8  C   ADE     1      -2.400   0.000   0.000\nATOM      9  N   ADE     1      -1.400  -0.900   0.000\nATOM     10  N   ADE     1       2.050  -1.200   0.000\nEND`,
                surface: false
            }
        },
        {
            id: 20,
            title: 'Acetic Acid (CH₃COOH)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Acid acetic - thành phần giấm',
            type: '3d',
            moleculeData: {
                type: 'xyz',
                data: `8\nAcetic acid\nC 0.000 0.000 0.000\nC 1.520 0.000 0.000\nO 2.120 1.080 0.000\nO 2.120 -1.200 0.000\nH -0.380 1.030 0.000\nH -0.380 -0.515 0.890\nH -0.380 -0.515 -0.890\nH 3.080 -1.200 0.000`,
                surface: false
            }
        },
        {
            id: 21,
            title: 'Oxygen (O₂)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Phân tử oxy - khí cần thiết cho sự sống',
            type: '3d',
            moleculeData: {
                type: 'xyz',
                data: `2\nOxygen molecule\nO 0.000 0.000 0.000\nO 1.210 0.000 0.000`,
                surface: false
            }
        },
        {
            id: 22,
            title: 'Nitrogen (N₂)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Phân tử nitơ - 78% không khí',
            type: '3d',
            moleculeData: {
                type: 'xyz',
                data: `2\nNitrogen molecule\nN 0.000 0.000 0.000\nN 1.098 0.000 0.000`,
                surface: false
            }
        },
        {
            id: 23,
            title: 'Ozone (O₃)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Phân tử ozon - bảo vệ khỏi tia UV',
            type: '3d',
            moleculeData: {
                type: 'xyz',
                data: `3\nOzone molecule\nO 0.000 0.000 0.000\nO 1.278 0.000 0.000\nO 0.639 1.107 0.000`,
                surface: false
            }
        },
        {
            id: 24,
            title: 'Formaldehyde (CH₂O)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Formaldehyde - chất bảo quản',
            type: '3d',
            moleculeData: {
                type: 'xyz',
                data: `4\nFormaldehyde\nC 0.000 0.000 0.000\nO 1.210 0.000 0.000\nH -0.580 0.940 0.000\nH -0.580 -0.940 0.000`,
                surface: false
            }
        },
        {
            id: 25,
            title: 'Propane (C₃H₈)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Propane - khí đốt dân dụng',
            type: '3d',
            moleculeData: {
                type: 'xyz',
                data: `11\nPropane molecule\nC 0.000 0.000 0.000\nC 1.520 0.000 0.000\nC 2.030 1.420 0.000\nH -0.380 1.030 0.000\nH -0.380 -0.515 0.890\nH -0.380 -0.515 -0.890\nH 1.900 -0.515 0.890\nH 1.900 -0.515 -0.890\nH 2.410 1.935 0.890\nH 2.410 1.935 -0.890\nH 1.650 1.935 0.000`,
                surface: false
            }
        },
        {
            id: 26,
            title: 'Butane (C₄H₁₀)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Butane - nhiên liệu bật lửa',
            type: '3d',
            moleculeData: {
                type: 'pdb',
                data: `COMPND    BUTANE
ATOM      1  C1  BUT     1       0.000   0.000   0.000
ATOM      2  C2  BUT     1       1.520   0.000   0.000
ATOM      3  C3  BUT     1       2.030   1.420   0.000
ATOM      4  C4  BUT     1       3.550   1.420   0.000
ATOM      5  H1  BUT     1      -0.380   1.030   0.000
ATOM      6  H2  BUT     1      -0.380  -0.515   0.890
ATOM      7  H3  BUT     1      -0.380  -0.515  -0.890
ATOM      8  H4  BUT     1       1.900  -0.515   0.890
ATOM      9  H5  BUT     1       1.900  -0.515  -0.890
ATOM     10  H6  BUT     1       1.650   1.935   0.890
ATOM     11  H7  BUT     1       1.650   1.935  -0.890
ATOM     12  H8  BUT     1       3.930   0.905   0.890
ATOM     13  H9  BUT     1       3.930   0.905  -0.890
ATOM     14  H10 BUT     1       3.930   2.450   0.000
END`,
                surface: false
            }
        },
        {
            id: 27,
            title: 'Toluene (C₇H₈)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Toluene - dung môi công nghiệp',
            type: '3d',
            moleculeData: {
                type: 'pdb',
                data: `COMPND    TOLUENE
ATOM      1  C1  TOL     1       1.400   0.000   0.000
ATOM      2  C2  TOL     1       0.700   1.212   0.000
ATOM      3  C3  TOL     1      -0.700   1.212   0.000
ATOM      4  C4  TOL     1      -1.400   0.000   0.000
ATOM      5  C5  TOL     1      -0.700  -1.212   0.000
ATOM      6  C6  TOL     1       0.700  -1.212   0.000
ATOM      7  C7  TOL     1       2.900   0.000   0.000
ATOM      8  H1  TOL     1       1.245   2.157   0.000
ATOM      9  H2  TOL     1      -1.245   2.157   0.000
ATOM     10  H3  TOL     1      -2.490   0.000   0.000
ATOM     11  H4  TOL     1      -1.245  -2.157   0.000
ATOM     12  H5  TOL     1       1.245  -2.157   0.000
ATOM     13  H6  TOL     1       3.280   0.515   0.890
ATOM     14  H7  TOL     1       3.280   0.515  -0.890
ATOM     15  H8  TOL     1       3.280  -1.030   0.000
END`,
                surface: false
            }
        },
        {
            id: 28,
            title: 'Penicillin',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Penicillin - kháng sinh đầu tiên',
            type: '3d',
            moleculeData: {
                type: 'pdb',
                data: `COMPND    PENICILLIN
ATOM      1  C1  PEN     1       0.000   0.000   0.000
ATOM      2  C2  PEN     1       1.400   0.000   0.000
ATOM      3  C3  PEN     1       2.100   1.212   0.000
ATOM      4  N1  PEN     1       1.400   2.424   0.000
ATOM      5  C4  PEN     1       0.000   2.424   0.000
ATOM      6  S1  PEN     1      -0.700   0.900   1.400
ATOM      7  C5  PEN     1       2.100   3.636   0.000
ATOM      8  O1  PEN     1       3.320   3.636   0.000
ATOM      9  C6  PEN     1       1.400   4.848   0.000
ATOM     10  C7  PEN     1      -0.700   3.636   0.000
ATOM     11  O2  PEN     1      -1.920   3.636   0.000
ATOM     12  O3  PEN     1       0.000   4.848   0.000
END`,
                surface: false
            }
        },
        {
            id: 29,
            title: 'Hydrogen Peroxide (H₂O₂)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Nước oxy già - chất khử trùng',
            type: '3d',
            moleculeData: {
                type: 'xyz',
                data: `4\nHydrogen Peroxide\nO 0.000 0.000 0.000\nO 1.460 0.000 0.000\nH -0.380 0.880 0.000\nH 1.840 0.000 0.880`,
                surface: false
            }
        },
        {
            id: 30,
            title: 'Sulfuric Acid (H₂SO₄)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Acid sulfuric - axit mạnh nhất',
            type: '3d',
            moleculeData: {
                type: 'pdb',
                data: `COMPND    SULFURIC ACID
ATOM      1  S   H2S     1       0.000   0.000   0.000
ATOM      2  O1  H2S     1       1.500   0.000   0.000
ATOM      3  O2  H2S     1      -0.500   1.300   0.000
ATOM      4  O3  H2S     1      -0.500  -0.650   1.100
ATOM      5  O4  H2S     1      -0.500  -0.650  -1.100
ATOM      6  H1  H2S     1       2.000   0.800   0.000
ATOM      7  H2  H2S     1      -1.000   1.800   0.800
END`,
                surface: false
            }
        },
        {
            id: 31,
            title: 'Nitric Acid (HNO₃)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Acid nitric - sản xuất phân bón',
            type: '3d',
            moleculeData: {
                type: 'xyz',
                data: `5\nNitric Acid\nN 0.000 0.000 0.000\nO 1.210 0.000 0.000\nO -0.605 1.048 0.000\nO -0.605 -1.048 0.000\nH 1.590 0.880 0.000`,
                surface: false
            }
        },
        {
            id: 32,
            title: 'Chloroform (CHCl₃)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Chloroform - dung môi hữu cơ',
            type: '3d',
            moleculeData: {
                type: 'xyz',
                data: `5\nChloroform\nC 0.000 0.000 0.000\nH 0.000 0.000 1.100\nCl 1.700 0.000 -0.400\nCl -0.850 1.472 -0.400\nCl -0.850 -1.472 -0.400`,
                surface: false
            }
        },
        {
            id: 33,
            title: 'Acetone (C₃H₆O)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Acetone - tẩy sơn móng tay',
            type: '3d',
            moleculeData: {
                type: 'xyz',
                data: `10\nAcetone\nC 0.000 0.000 0.000\nC 1.520 0.000 0.000\nC 2.030 1.420 0.000\nO 0.760 2.120 0.000\nH -0.380 1.030 0.000\nH -0.380 -0.515 0.890\nH -0.380 -0.515 -0.890\nH 2.410 1.935 0.890\nH 2.410 1.935 -0.890\nH 1.650 1.935 0.000`,
                surface: false
            }
        },
        {
            id: 34,
            title: 'Glycerol (C₃H₈O₃)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Glycerol - chất làm ẩm',
            type: '3d',
            moleculeData: {
                type: 'pdb',
                data: `COMPND    GLYCEROL
ATOM      1  C1  GLY     1       0.000   0.000   0.000
ATOM      2  C2  GLY     1       1.520   0.000   0.000
ATOM      3  C3  GLY     1       2.030   1.420   0.000
ATOM      4  O1  GLY     1      -0.510   0.710   1.240
ATOM      5  O2  GLY     1       2.030  -0.710   1.090
ATOM      6  O3  GLY     1       3.450   1.420   0.000
ATOM      7  H1  GLY     1      -1.470   0.710   1.240
ATOM      8  H2  GLY     1       2.990  -0.710   1.090
ATOM      9  H3  GLY     1       3.830   2.350   0.000
END`,
                surface: false
            }
        },
        {
            id: 35,
            title: 'Urea (CH₄N₂O)',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Urea - phân bón hóa học',
            type: '3d',
            moleculeData: {
                type: 'xyz',
                data: `8\nUrea\nC 0.000 0.000 0.000\nO 1.210 0.000 0.000\nN -0.680 1.140 0.000\nN -0.680 -1.140 0.000\nH -0.280 2.080 0.000\nH -1.680 1.140 0.000\nH -0.280 -2.080 0.000\nH -1.680 -1.140 0.000`,
                surface: false
            }
        },
        {
            id: 36,
            title: 'Cholesterol',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Cholesterol - lipid quan trọng',
            type: '3d',
            moleculeData: {
                type: 'pdb',
                data: `COMPND    CHOLESTEROL
ATOM      1  C1  CHO     1       0.000   0.000   0.000
ATOM      2  C2  CHO     1       1.400   0.000   0.000
ATOM      3  C3  CHO     1       2.100   1.212   0.000
ATOM      4  C4  CHO     1       1.400   2.424   0.000
ATOM      5  C5  CHO     1       0.000   2.424   0.000
ATOM      6  C6  CHO     1      -0.700   1.212   0.000
ATOM      7  C7  CHO     1      -2.100   1.212   0.000
ATOM      8  C8  CHO     1      -2.800   2.424   0.000
ATOM      9  C9  CHO     1      -2.100   3.636   0.000
ATOM     10  C10 CHO     1      -0.700   3.636   0.000
ATOM     11  O1  CHO     1       3.500   1.212   0.000
ATOM     12  H1  CHO     1       4.000   2.000   0.000
END`,
                surface: false
            }
        },
        {
            id: 37,
            title: 'Dopamine',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Dopamine - chất dẫn truyền thần kinh',
            type: '3d',
            moleculeData: {
                type: 'pdb',
                data: `COMPND    DOPAMINE
ATOM      1  C1  DOP     1       0.000   0.000   0.000
ATOM      2  C2  DOP     1       1.400   0.000   0.000
ATOM      3  C3  DOP     1       2.100   1.212   0.000
ATOM      4  C4  DOP     1       1.400   2.424   0.000
ATOM      5  C5  DOP     1       0.000   2.424   0.000
ATOM      6  C6  DOP     1      -0.700   1.212   0.000
ATOM      7  O1  DOP     1       2.100   3.636   0.000
ATOM      8  O2  DOP     1      -0.700   3.636   0.000
ATOM      9  C7  DOP     1       3.500   1.212   0.000
ATOM     10  C8  DOP     1       4.200   2.424   0.000
ATOM     11  N1  DOP     1       5.600   2.424   0.000
END`,
                surface: false
            }
        },
        {
            id: 38,
            title: 'Serotonin',
            icon: <Hexagon className="w-5 h-5" />,
            description: 'Serotonin - hormone hạnh phúc',
            type: '3d',
            moleculeData: {
                type: 'pdb',
                data: `COMPND    SEROTONIN
ATOM      1  C1  SER     1       0.000   0.000   0.000
ATOM      2  C2  SER     1       1.400   0.000   0.000
ATOM      3  C3  SER     1       2.100   1.212   0.000
ATOM      4  C4  SER     1       1.400   2.424   0.000
ATOM      5  C5  SER     1       0.000   2.424   0.000
ATOM      6  C6  SER     1      -0.700   1.212   0.000
ATOM      7  C7  SER     1      -2.100   1.212   0.000
ATOM      8  C8  SER     1      -2.800   0.000   0.000
ATOM      9  N1  SER     1      -2.100  -1.212   0.000
ATOM     10  C9  SER     1      -0.700  -1.212   0.000
ATOM     11  O1  SER     1       2.100   3.636   0.000
ATOM     12  C10 SER     1       3.500   1.212   0.000
ATOM     13  C11 SER     1       4.200   2.424   0.000
ATOM     14  N2  SER     1       5.600   2.424   0.000
END`,
                surface: false
            }
        }
    ]

    const [selectedExperiment, setSelectedExperiment] = useState(experiments[0]);
    const [showQuiz, setShowQuiz] = useState(false);

    return (
        <div className="bg-slate-50 flex" style={{ height: 'calc(100vh - 64px)' }}>
            {/* Sidebar - Danh sách thí nghiệm */}
            <aside className="w-80 bg-white border-r border-slate-200 flex flex-col">
                <div className="p-6 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Thí Nghiệm</h2>
                    <p className="text-sm text-gray-600 mb-6">Chọn một thí nghiệm để bắt đầu</p>
                </div>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    <div className="space-y-2">
                        {experiments.map((experiment) => (
                            <button
                                key={experiment.id}
                                onClick={() => setSelectedExperiment(experiment)}
                                className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${selectedExperiment.id === experiment.id
                                    ? 'bg-primary/10 border-2 border-primary shadow-sm'
                                    : 'bg-slate-50 border-2 border-transparent hover:bg-slate-100 hover:border-slate-300'
                                    }`}
                            >
                                <div className="flex items-start space-x-3">
                                    <div className={`mt-1 ${selectedExperiment.id === experiment.id
                                        ? 'text-primary'
                                        : 'text-gray-600'
                                        }`}>
                                        {experiment.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold mb-1 ${selectedExperiment.id === experiment.id
                                            ? 'text-primary'
                                            : 'text-gray-900'
                                            }`}>
                                            {experiment.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {experiment.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Content - Preview */}
            <main className="flex-1 flex flex-col bg-slate-100">
                {/* Header */}
                <div className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="text-primary">
                                {selectedExperiment.icon}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {selectedExperiment.title}
                                </h1>
                                <p className="text-sm text-gray-600">
                                    {selectedExperiment.description}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowQuiz(true)}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-primary/90 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <Brain className="w-5 h-5" />
                            Tạo Câu Hỏi Trắc Nghiệm
                        </button>
                    </div>
                </div>

                {/* Preview - 3D Molecule or Iframe */}
                <div className="flex-1 p-6">
                    {selectedExperiment.type === '3d' ? (
                        <div className="w-full h-full bg-white rounded-lg shadow-lg">
                            <MoleculeViewer
                                moleculeData={selectedExperiment.moleculeData}
                                style="stick"
                                backgroundColor="#f8fafc"
                            />
                        </div>
                    ) : (
                        <div className="relative w-full h-full rounded-lg shadow-lg overflow-hidden">
                            <iframe
                                src={selectedExperiment.iframeUrl}
                                className="w-full h-full"
                                style={{ border: 'none' }}
                                allowFullScreen
                                sandbox="allow-scripts allow-same-origin allow-forms"
                                title={selectedExperiment.title}
                            />
                            {/* Custom Logo Overlay */}
                            <div className="absolute bottom-0 right-0 bg-white px-6 py-3 rounded-tl-2xl shadow-xl z-10 flex items-center gap-3 border-t border-l border-gray-100 min-w-[160px] justify-center">
                                <div className="bg-gradient-to-br from-primary to-blue-600 p-2 rounded-xl">
                                    <FlaskConical className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent text-base">
                                    ChemLab
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Quiz Generator Modal */}
            {showQuiz && (
                <QuizGenerator
                    reactionTitle={selectedExperiment.title}
                    reactionDescription={selectedExperiment.description}
                    onClose={() => setShowQuiz(false)}
                />
            )}

            {/* AI ChatBot */}
            <ChatBot
                contextTitle={selectedExperiment.title}
                contextDescription={selectedExperiment.description}
            />
        </div>
    )
}

export default Explore
