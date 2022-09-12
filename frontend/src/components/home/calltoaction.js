import React from "react"
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useMediaQuery } from "@material-ui/core";    
import { Link } from "gatsby"
import cta from '../../images/cta.svg'

const usestyle=makeStyles(theme=>({
account:{
    color: '#fff',
    marginLeft:'2rem',

},
headingcontainer:{
 [theme.breakpoints.down('md')]:{
        padding:  '0 1rem',
    },
    [theme.breakpoints.down('xs')]:{
        padding:  '0',
    }
},
buttoncontainer:{
    marginTop:'3rem',
},
body:{
    maxWidth:'45rem',
    [theme.breakpoints.down('md')]:{
        padding:  '0 1rem',
    },

    [theme.breakpoints.down('xs')]:{
        padding:  '0',
    }
},
container:{
marginBottom:'15rem',
},
icon:{
    [theme.breakpoints.down('xs')]:{
      height: '18rem',
      width:'20rem'
    },
}


}))
export default function Calltoaction(){
const matchsmd=useMediaQuery(theme=>theme.breakpoints.down('md'))
    const classes=usestyle()
    return(
        <Grid container justify='space-around' direction={matchsmd ? 'column':'row'} alignItems="center" classes={{root:classes.container}}>
            <Grid item>
                <img className={classes.icon} src={cta} alt="action" />

            </Grid>
            <Grid item>
                <Grid container direction="column">
                    <Grid item classes={{root:classes.headingcontainer}}>
                        <Typography align={matchsmd ? 'center':undefined} variant="h1">
                            committed to quality
                        </Typography>
                    </Grid>
                    <Grid item classes={{root:classes.body}}>
                        <Typography align={matchsmd ? 'center':undefined} variant="body1">
                             At VAR X our mission is to provide comfortable, durable, premium,
              designer clothing and clothing accessories to developers and
              technology enthusiasts.
                        </Typography>
                    </Grid>
                    <Grid justify={matchsmd ? 'center': undefined} item container classes={{root:classes.buttoncontainer}}>
                        <Grid item>
                            <Button component={Link} to='/contact' variant='outlined' color='primary'>
                                contact us
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button component={Link} to='/account' variant='contained' color='primary' classes={{root:classes.account}}>
                                Create Account
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}