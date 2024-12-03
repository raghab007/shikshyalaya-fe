import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import { Link } from 'react-router-dom';

export default function BasicCard({price,description,title,imageSrc}) {
  return (
    <Card sx={{ width: 320, position: 'relative',height:'350px' }}>
      <div>
        <Typography level="title-lg">{title}</Typography>
        <Typography level="body-sm">{description}</Typography>
        <IconButton
          aria-label="bookmark Yosemite National Park"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
          <BookmarkAdd />
        </IconButton>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src= {imageSrc}
          loading="lazy"
          alt=  {description}
        />
      </AspectRatio>
      <CardContent orientation="horizontal" sx={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <Typography level="body-xs">Total price:</Typography>
          <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>Rs {price}</Typography>
        </div>
        <Link to={"/coursedetails"} style={{marginLeft:'100px'}} >
        <Button
          variant="solid"
          size="md"
          color="primary"
          aria-label="Explore Yosemite"
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
        >
        View Course
        </Button>
        </Link>
      </CardContent>
      
      {/* Add to Cart Button */}
      <CardContent orientation="horizontal" sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          variant="outlined"
          size="md"
          color="secondary"
          aria-label="Add to Cart"
          sx={{ width: '100%', fontWeight: 600 }}
        >
           Add to Cart
          
        </Button>
      </CardContent>
    </Card>
  );
}
