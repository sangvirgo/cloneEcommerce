import { Avatar, Grid, Box, Rating } from '@mui/material'

const ProductReviewCard = (reviewss) => {
  return (
    <div>
        <Grid container spacing={2} gap={3}>

            <Grid item xs={1}>
                <Box>
                <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: 'purple' }}
              src={reviewss.avatar}
              alt={name}
            />



            
                </Box>
            </Grid>

            <Grid item xs={9}>
                <div className='space-y-2'>
                    <div>
                        <p className='font-semibold text-lg'>{reviewss.name}</p>
                        <p className='opacity-60'>{reviewss.date}</p>
                    </div>
                </div>

                <Rating value={reviewss.rating} name='half-rating' readOnly precision={.5}/>
                <p>{reviewss.review}</p>
            </Grid>

        </Grid>
    </div>
  )
}

export default ProductReviewCard