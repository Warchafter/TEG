import React from 'react'
import { CFooter } from '@coreui/react'

import {Grid} from '@material-ui/core'

import CIcon from '@coreui/icons-react'
import { brandSet } from '@coreui/icons'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <Grid container spacing={1}>
          <Grid item>
            <CIcon content={brandSet.cibCoreuiC}/>
          </Grid>
          <Grid item>
            <CIcon content={brandSet.cibMaterialDesign}/>
          </Grid>
          <Grid item>
            <CIcon content={brandSet.cibReact}/>
          </Grid>
          <Grid item>
            <CIcon content={brandSet.cibRedux}/>
          </Grid>
          <Grid item>
            <CIcon content={brandSet.cibPython}/>
          </Grid>
          <Grid item>
            <CIcon content={brandSet.cibDjango}/>
          </Grid>
          <Grid item>
            <CIcon content={brandSet.cibPostgresql}/>
          </Grid>
          <Grid item>
            <CIcon content={brandSet.cibDocker}/>
          </Grid>
          <Grid item>
            <CIcon content={brandSet.cibUbuntu}/>
          </Grid>
          <Grid item>
            <span className="ms-1">&copy; 2021 IH Insumos Hospitalarios.</span>
          </Grid>
        </Grid>
      </div>
      <div className="ms-auto">
        <span className="me-1">Creado por </span>
        <a href="https://github.com/Warchafter" target="_blank" rel="noopener noreferrer">
          Kevin Arriaga
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
