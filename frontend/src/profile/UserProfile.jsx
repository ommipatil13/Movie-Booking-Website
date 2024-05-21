import React, { Fragment, useEffect, useState } from 'react'
import { deleteBooking, getUserBooking, getUserDetails } from '../api_helpers/api_helpers'
import { Box } from '@mui/system';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const UserProfile = () => {

    const [bookings, setBookings] = useState('')
    const [user, setUser] = useState('')

    useEffect(() => {
        getUserBooking().then((res) => setBookings(res.bookings)).catch((error) => console.log(error))

        getUserDetails().then((res) => setUser(res.user)).catch((error) => console.log(error))
    }, [])

    // console.log(bookings)

    const handleDelete = (id) => {
        deleteBooking(id).then((res) => console.log(res)).catch((error) => console.log(error))
    }

    return (
        <Box width={'100%'} display={'flex'} >


            <Fragment>

                {user && < Box width={'30%'} padding={3} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
                    <InsertEmoticonIcon sx={{ fontSize: '10rem', ml: 15 }} />
                    <Typography padding={1} width={'auto'} textAlign={'center'} border={'1px solid #ccc'} borderRadius={6} >
                        Name: {user.name}
                    </Typography>
                    <Typography marginTop={1} padding={1} width={'auto'} textAlign={'center'} border={'1px solid #ccc'} borderRadius={6} >
                        Email: {user.email}
                    </Typography>
                </Box>}

                {bookings && bookings.length > 0 && < Box width={'70%'} display={'flex'} flexDirection={'column'} >

                    <Typography variant='h3' fontFamily={'verdana'} textAlign={'center'} padding={2} >Bookings</Typography>
                    <Box width={'80%'} margin={'auto'} display={'flex'} flexDirection={'column'} >
                        <List>
                            {
                                bookings.map((booking, index) => (
                                    <ListItem sx={{ bgcolor: '#900C3F', color: 'white', textAlign: 'center', margin: 1, borderRadius: 8 }} >
                                        <ListItemText sx={{ margin: 1, width: 'auto', textAlign: 'left' }} >
                                            Movie: {booking.movie.title}
                                        </ListItemText>
                                        <ListItemText sx={{ margin: 1, width: 'auto', textAlign: 'left' }} >
                                            Seat Number: {booking.seatNumber}
                                        </ListItemText>
                                        <ListItemText sx={{ margin: 1, width: 'auto', textAlign: 'left' }} >
                                            Date: {new Date(booking.date).toDateString()}
                                        </ListItemText>
                                        <IconButton sx={{ color: 'white' }} onClick={() => handleDelete(booking._id)} >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Box>

                </Box>}

            </Fragment >

        </Box >
    )
}

export default UserProfile 