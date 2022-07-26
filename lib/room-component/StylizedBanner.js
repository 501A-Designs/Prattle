import React from 'react'
import { useFilter, useSelect } from 'react-supabase'
import AlignItems from '../style-component/AlignItems'
import VisibilityTag from '../tag-component/VisibilityTag'

export default function StylizedBanner(props) {
  const filter = useFilter((query) =>query.eq('room_id', props.roomId))
  const [{data, error, fetching }] = useSelect('rooms', {filter})

  error && console.log(error.message)
  fetching && console.log(data)

  let user = props.user;

  let stylizedBanner ={
    // padding:'0.5em',
    borderRadius:'var(--borderRadius1)',
    border:'var(--baseBorder2)',
    backgroundColor:'var(--baseColor1)',
    backgroundImage:`url(${data && data[0].background_image})`,
    backgroundPosition: 'center',
    objectFit: 'cover',
    marginBottom:'1em'
  }
  let stylizedBannerInside = {
    borderRadius:'calc(var(--borderRadius0)*1.2)',
    background: 'linear-gradient(to right,var(--prattleColor1) 0%,rgba(255,255,255,0) 100%)',
    // border:'var(--baseBorder2)',
    // backgroundColor:'var(--baseColor0)',
    width:'100%',
    height:'100%',
    padding:'1em',
    display: 'flex',
    alignItems: 'center'
  }
  
  function VisibilityTagContainer({children}) {
    return (
      <div
        style={{
          padding: '0.25em 0.5em',
          float:'right',
          backgroundColor:'var(--baseColor0)',
          borderRadius: 'calc(var(--borderRadius2)*2)',
          boxShadow: 'var(--boxShadow)',
        }}
      >
        {children}
      </div>
    )
  }
  

  return (
    <>
      {data &&       
        <div style={stylizedBanner}>
          <div style={stylizedBannerInside}>
            <div style={{width:'100%',}}>
              <AlignItems spaceBetween>
                <h3
                  style={{
                    margin: 0,
                    color: 'var(--baseColor0)',
                  }}
                >
                  {data[0].room_name}
                </h3>
                {user ?
                  <>
                    {user.id !== data[0].room_creator &&
                      <VisibilityTagContainer>
                        <VisibilityTag
                          largeVisibility
                          user={user.id}
                          isEditable={data[0].room_editable}
                        />
                      </VisibilityTagContainer>
                    }
                  </>:
                  <VisibilityTagContainer>
                    <VisibilityTag
                      largeVisibility
                      isEditable={data[0].room_editable}
                    />
                  </VisibilityTagContainer>
                }
              </AlignItems>
              <p
                style={{
                  color: 'var(--baseColor2)',
                  width:'70%',
                }}
              >
                {data && data[0].description}
              </p>
            </div>
          </div>
        </div>
      }
    </>
  )
}
