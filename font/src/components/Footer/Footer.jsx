import { Typography, Grid, Button, Link } from "@mui/material"

const Footer = () => {
  return (
    <div>
        <Grid className='bg-black text-white text-center mt-10' 
        container 
        sx={{bgcolor: 'black', color: 'white', py: 5}}
        >
            <Grid item xs={12} sm={6} md={3}>

                <div>
                <Typography className="pb-5 text-3xl" variant="h6">Company</Typography>
                </div>

                <div>
                    <Button className="pb-5" variant="text">About</Button>
                </div>

                <div>
                    <Button className="pb-5" variant="text" >Blog</Button>
                </div>

                <div>
                    <Button className="pb-5" variant="text" >Press</Button>
                </div>

                <div>
                    <Button className="pb-5" variant="text" >Jobs</Button>
                </div>

                <div>
                    <Button className="pb-5" variant="text" >Partners</Button>
                </div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>

                <div>
                    <Typography className="pb-5 text-3xl" variant="h6">Solutions</Typography>
                </div>

                <div>
                    <Button className="pb-5" variant="text" >Marketing</Button>
                </div>

                <div>
                    <Button className="pb-5" variant="text" >Analtics</Button>
                </div>

                <div>
                    <Button className="pb-5" variant="text" >Commerce</Button>
                </div>

                <div>
                    <Button className="pb-5" variant="text" >Insights</Button>
                </div>

                <div>
                    <Button className="pb-5" variant="text" >Support</Button>
                </div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>

            <div>
                <Typography className="pb-5 text-3xl" variant="h6">Documentation</Typography>
            </div>

            <div>
                <Button className="pb-5" variant="text" >Guides</Button>
            </div>

            <div>
                <Button className="pb-5" variant="text" >API Status</Button>
            </div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>

                <div>
                    <Typography className="pb-5 text-3xl" variant="h6">Legal</Typography>
                </div>

                <div>
                    <Button className="pb-5" variant="text" >Claim</Button>
                </div>

                <div>
                    <Button className="pb-5" variant="text" >Privacy</Button>
                </div>

                <div>
                    <Button className="pb-5" variant="text" >Terms</Button>
                </div>
            </Grid>

            <Grid className='pt-5 mt-[0.5px]' item xs={12} >
                <Typography variant="body2" component="p" align="center">
                    &copy; 2025 My Company. All rights reserved.
                </Typography>
                <Typography variant="body2" component="p" align="center">
                    Made with love by Me.
                </Typography>
                <Typography variant="body2" component="p" align="center">
                    Icons made by{' '}
                <Link href="https://www.sangsang.com" color="inherit" underline="always">
                    Sang Sang
                </Link>{' '}
                    from{' '}
                <Link href="https://www.sangsang.com/" color="inherit" underline="always">
                    www.sangsang.com
                </Link>
                </Typography>
            </Grid>

        </Grid>
    </div>
  )
}

export default Footer