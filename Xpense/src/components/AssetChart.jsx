import { PieChart, pieClasses } from '@mui/x-charts';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';

const StyledText = styled('text')(({ theme }) => ({
    fill: '#4B2861',
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
    fontFamily: "monospace",
}));

function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();

    return (
        <StyledText x={left + width / 2} y={top + height / 2}>
            {children}
        </StyledText>
    );
}

function AssetChart({ supabase, bank }) {

    const [assetData, setAssetData] = useState([]);

    useEffect(() => {
        async function getAssets() {
            const { data, error } = await supabase
                .from('asset')
                .select('bank, balance');

            if (error) {
                console.error('Error fetching assets:', error);
                return;
            }

            setAssetData(
                data.map((asset, index) => ({
                    id: index,
                    value: asset.balance,
                    label: asset.bank,
                }))
            );
        }

        getAssets();
    }, [supabase]);

    const totalAssets = assetData.reduce(
        (total, asset) => total + asset.value,
        0
    );
    
    return (
        <div class="fixed flex flex-col w-[min(80vw,500px)] bg-mauve-300 flex items-center justify-center gap-1 top-40 border-4 h-80 border-mauve-500 z-0">
            <p class="text-mauve-500 font-mono pt-5">Total Assets</p>
            <PieChart
            colors={[ '#4B2861', '#795F8A']} 
            height={200}
            width={200}
            series={[
                {
                    data: assetData,
                    innerRadius: 90,
                    outerRadius: 100,
                    paddingAngle: 3,
                    cornerRadius: 4,
                    startAngle: 0,
                    endAngle: 360
                }
            ]}
            slotProps={{
                legend: {
                    hidden: true,
                },
            }}
            >
                <PieCenterLabel>${totalAssets.toLocaleString()}</PieCenterLabel>
            </PieChart>
        </div>
        
    );
}


export default AssetChart;