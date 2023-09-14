import React, { ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface SelectionComponentProps {
    id: string;
    label: string;
    value: string;
    onChange: (event: ChangeEvent<{ value: string }>) => void;
    currencyCodes: string[];
    language: { code: string }[];
}

function SelectionComponent({
    id,
    label,
    value,
    onChange,
    currencyCodes,
    language,
}: SelectionComponentProps) {
    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 0, width: '95%' } }}
            noValidate
            autoComplete="off"

        >
            <TextField
                id={id}
                select
                label={label}
                InputLabelProps={{ sx: { color: '#fff' } }}
                inputProps={{ sx: { color: 'white' } }}
                value={value}
                onChange={onChange}
                SelectProps={{
                    MenuProps: {
                        PaperProps: {
                            style: {
                                backgroundColor: '#1a202c',
                                maxHeight: 200,
                            },
                        },
                    },
                }}
            >
                {currencyCodes.map((currencyCode) => (
                    <MenuItem key={currencyCode} style={{ backgroundColor: '#1a202c', color: '#fff' }} value={currencyCode}>
                        {language.find((option) => option.code.split(' ')[1] === currencyCode)?.code}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
}

export default SelectionComponent;
