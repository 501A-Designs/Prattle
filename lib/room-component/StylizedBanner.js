import React from 'react'
import AlignItems from '../style-component/AlignItems'
import VisibilityTag from '../tag-component/VisibilityTag'

export default function StylizedBanner(props) {
  let user = props.user;
  let data = props.data;

  let stylizedBanner ={
    // padding:'0.5em',
    borderRadius:'var(--borderRadius1)',
    border:'var(--baseBorder2)',
    backgroundColor:'var(--baseColor1)',
    backgroundImage:`url(${data && data.background_image})`,
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
                  {data.room_name}
                </h3>
                {user ?
                  <>
                    {user.id !== data.room_creator &&
                      <VisibilityTagContainer>
                        <VisibilityTag
                          largeVisibility
                          user={user.id}
                          isEditable={data.room_editable}
                        />
                      </VisibilityTagContainer>
                    }
                  </>:
                  <VisibilityTagContainer>
                    <VisibilityTag
                      largeVisibility
                      isEditable={data.room_editable}
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
                {data.description}
              </p>
            </div>
          </div>
        </div>
      }
    </>
  )
}
