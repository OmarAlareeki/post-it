import React from "react";
import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
import ShareIcon from '@mui/icons-material/Share';
// import { FavoriteIcon, FavoriteBorderIcon } from '@mui/icons-material';
import styles from "./ShareBtn.module.css";

export default function ShareBtn() {

    return (
        // <Stack spacing={2}>
            <Button className={styles.btn} variant="outlined" endIcon={<ShareIcon />} color="primary">
                Share
            </Button>
        // </Stack>
    )
}