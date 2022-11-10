import React from "react";
import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

type Props = {
  name: string;
  handleChange: () => void;
  label: string;
  type: string;
  half: boolean;
  handleShowPassword?: () => void;
};

export default function Input({
  name,
  handleChange,
  label,
  type,
  half,
}: Props) {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        label={label}
        type={type}
        autoFocus
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
    </Grid>
  );
}
