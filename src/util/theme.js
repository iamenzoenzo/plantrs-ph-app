/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    palette: {
      primary: {
        light: '#649658',
        main: '#149414',
        dark: '#0e6b0e',
        contrastText: '#fff'
      },
      secondary: {
        light: '#fff263',
        main: '#fbc02d',
        dark: '#c49000',
        contrastText: '#fff'
      }
    },
    spreadThis: {
        typography: {
            useNextVariants: true
          },
          card: {
            marginBottom: 20,
            padding: 20,
            minWidth: 300,
          },
          form: {
              textAlign: 'center'
          },
          logo: {
              margin: '20px auto 20px auto',
          },
          pageTitle: {
              margin: '10px auto 10px auto',
          },
          textField: {
              margin: '10px auto 10px auto',
          },
          button: {
              marginTop: 20,
              position: 'relative'
          },
          customError: {
              color: 'red',
              fontSize: '0.8rem'
          },
          progress: {
              position: 'absolute'
          },
          invisibleSeparator: {
            border: 'none',
            margin: 4
          },
          visibleSeparator: {
              width: '100%',
              border: '1px dashed rgba(63, 191, 63, 0.4)' ,
              marginBottom: 20
          },
          // Profile
          paper: {
            padding: 20
          },
          profile: {
            '& .image-wrapper': {
              textAlign: 'center',
              position: 'relative',
              '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
              }
            },
            '& .profile-image': {
              width: 150,
              height: 150,
              objectFit: 'cover',
              maxWidth: '100%',
              borderRadius: '50%'
            },
            '& .profile-details': {
              textAlign: 'center',
              '& span, svg': {
                verticalAlign: 'middle'
              },
              '& a': {
                color: '#c0ca33',
              }
            },
            '& hr': {
              border: 'none',
              margin: '0 0 10px 0'
            },
            '& svg.button': {
              '&:hover': {
                cursor: 'pointer'
              }
            }
          },
          buttons: {
            textAlign: 'center',
            '& a': {
              margin: '20px 10px'
            }
          }
    }
  }