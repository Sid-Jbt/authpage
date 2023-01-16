export default function componentStyleOverrides(theme) {
  const { palette, typography, borders, boxShadows, functions } = theme;
  const {
    inputColors,
    transparent,
    dark,
    white,
    grey,
    gradients,
    light,
    text,
    info,
    secondary,
    black
  } = palette;
  const { size, fontWeightRegular, fontWeightBold } = typography;
  const { borderWidth, borderRadius, borderColor } = borders;
  const { md, buttonBoxShadow, lg, tabsBoxShadow, cardBoxShadow } = boxShadows;
  const { pxToRem, rgba, linearGradient } = functions;

  return {
    MuiAppBar: {
      defaultProps: {
        color: 'transparent'
      },
      styleOverrides: {
        root: {
          boxShadow: 'none'
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          transition: 'all 200ms ease-in-out'
        },
        rounded: {
          borderRadius: borderRadius.lg
        },
        img: {
          height: 'auto'
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          display: 'block',
          minHeight: pxToRem(24),
          marginBottom: pxToRem(2)
        },
        label: {
          display: 'inline-block',
          fontSize: size.sm,
          fontWeight: fontWeightBold,
          color: dark.main,
          lineHeight: 1,
          transform: `translateY(${pxToRem(1)})`,
          marginLeft: pxToRem(4),

          '&.Mui-disabled': {
            color: dark.main
          }
        }
      }
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
        color: 'inherit'
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: dark.main,
          fontSize: size.sm,
          fontWeight: fontWeightBold,
          lineHeight: 2,
          marginLeft: pxToRem(6),
          '&.Mui-focused': {
            color: dark.main
          }
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          display: 'flex !important',
          padding: `${pxToRem(8)} ${pxToRem(12)}`,
          border: `${borderWidth[1]} solid ${inputColors.borderColor.main}`,
          borderRadius: `${borderRadius.md} !important`,

          '& fieldset': {
            border: 'none'
          }
        },
        input: {
          height: pxToRem(22),
          width: 'max-content !important'
        },
        inputSizeSmall: {
          height: pxToRem(14)
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          display: 'flex !important',
          alignItems: 'center !important',
          width: '100% !important',
          height: 'auto !important',
          padding: `${pxToRem(8)} ${pxToRem(12)}`,
          fontSize: `${size.sm} !important`,
          fontWeight: `${fontWeightRegular} !important`,
          lineHeight: '1.4 !important',
          color: `${grey[700]} !important`,
          backgroundColor: `${white.main} !important`,
          backgroundClip: 'padding-box !important',
          border: `${borderWidth[1]} solid ${inputColors.borderColor.main}`,
          appearance: 'none !important',
          borderRadius: borderRadius.md,
          transition:
            'box-shadow 150ms ease, border-color 150ms ease, padding 150ms ease !important'
        },
        input: {
          width: '100% !important',
          height: pxToRem(22),
          paddingTop: '0 !important',
          paddingRight: '0 !important',
          paddingBottom: '0 !important',
          paddingLeft: pxToRem(6),
          '&::-webkit-input-placeholder': {
            color: `${dark.main} !important`
          }
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: transparent.main
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: size.sm,
          fontWeight: fontWeightBold,
          borderRadius: borderRadius.md,
          padding: `${pxToRem(10)} ${pxToRem(20)}`,
          lineHeight: 1.4,
          textAlign: 'center',
          textTransform: 'none',
          userSelect: 'none',
          backgroundSize: '150% !important',
          backgroundPositionX: '25% !important',
          transition: `all 150ms ease-in`,

          '&:hover': {
            transform: 'translateY(-1px)'
          },

          '&:disabled': {
            pointerEvent: 'none',
            opacity: 0.65
          },

          '& .material-icons': {
            fontSize: pxToRem(15),
            marginTop: pxToRem(-2)
          },
          ...(ownerState.variant === 'contained' && {
            backgroundColor: white.main,
            minHeight: pxToRem(40),
            color: text.main,
            boxShadow: buttonBoxShadow.main,
            padding: `${pxToRem(10)} ${pxToRem(20)}`,

            '&:hover': {
              backgroundColor: white.main,
              boxShadow: buttonBoxShadow.stateOf
            },

            '&:focus': {
              boxShadow: buttonBoxShadow.stateOf
            },

            '&:active, &:active:focus, &:active:hover': {
              opacity: 0.85,
              boxShadow: buttonBoxShadow.stateOf
            },

            '&:disabled': {
              boxShadow: buttonBoxShadow.main
            },

            '& .material-icon, .material-icons-round, svg': {
              fontSize: `${pxToRem(16)} !important`
            },
            small: {
              minHeight: pxToRem(3),
              padding: `${pxToRem(8)} ${pxToRem(32)}`,
              fontSize: size.xs,
              '& .material-icon, .material-icons-round, svg': {
                fontSize: `${pxToRem(12)} !important`
              }
            },
            large: {
              minHeight: pxToRem(47),
              padding: `${pxToRem(14)} ${pxToRem(64)}`,
              fontSize: size.sm,

              '& .material-icon, .material-icons-round, svg': {
                fontSize: `${pxToRem(22)} !important`
              }
            },
            primary: {
              backgroundColor: info.main,
              '&:hover': {
                backgroundColor: info.main
              },
              '&:focus:not(:hover)': {
                backgroundColor: info.focus,
                boxShadow: buttonBoxShadow.stateOfNotHover
              }
            },
            secondary: {
              backgroundColor: secondary.main,
              '&:hover': {
                backgroundColor: secondary.main
              },
              '&:focus:not(:hover)': {
                backgroundColor: secondary.focus,
                boxShadow: buttonBoxShadow.stateOfNotHover
              }
            }
          }),
          ...(ownerState.variant === 'outlined' && {
            minHeight: pxToRem(42),
            color: light.main,
            borderColor: light.main,
            padding: `${pxToRem(10)} ${pxToRem(20)}`,

            '&:hover': {
              opacity: 0.75,
              backgroundColor: transparent.main
            },

            '&:focus:not(:hover)': {
              boxShadow: buttonBoxShadow.stateOfNotHover
            },

            '& .material-icon, .material-icons-round, svg': {
              fontSize: `${pxToRem(16)} !important`
            },
            small: {
              minHeight: pxToRem(34),
              padding: `${pxToRem(8)} ${pxToRem(32)}`,
              fontSize: size.xs,

              '& .material-icon, .material-icons-round, svg': {
                fontSize: `${pxToRem(12)} !important`
              }
            },
            large: {
              minHeight: pxToRem(49),
              padding: `${pxToRem(14)} ${pxToRem(64)}`,
              fontSize: size.sm,

              '& .material-icon, .material-icons-round, svg': {
                fontSize: `${pxToRem(22)} !important`
              }
            },
            primary: {
              backgroundColor: transparent.main,
              borderColor: info.main,

              '&:hover': {
                backgroundColor: transparent.main
              },

              '&:focus:not(:hover)': {
                boxShadow: buttonBoxShadow.stateOfNotHover
              }
            },
            secondary: {
              backgroundColor: transparent.main,
              borderColor: secondary.main,

              '&:hover': {
                backgroundColor: transparent.main
              },

              '&:focus:not(:hover)': {
                boxShadow: buttonBoxShadow.stateOfNotHover
              }
            }
          }),
          ...(ownerState.variant === 'text' && {
            backgroundColor: transparent.main,
            height: 'max-content',
            color: info.main,
            boxShadow: 'none',
            padding: `${pxToRem(6)} ${pxToRem(12)}`,

            '&:hover': {
              backgroundColor: transparent.main,
              boxShadow: 'none',
              color: info.focus
            },

            '&:focus': {
              boxShadow: 'none',
              color: info.focus
            },

            '&:active, &:active:focus, &:active:hover': {
              opacity: 0.85,
              boxShadow: 'none'
            },

            '&:disabled': {
              color: grey[600],
              boxShadow: 'none'
            },

            '& .material-icons, .material-icons-round, svg, span': {
              fontSize: `${pxToRem(16)} !important`
            },
            small: {
              fontSize: size.xs,

              '& .material-icons, .material-icons-round, svg, span': {
                fontSize: `${pxToRem(12)} !important`
              }
            },

            large: {
              fontSize: size.sm,

              '& .material-icons, .material-icons-round, svg, span': {
                fontSize: `${pxToRem(22)} !important`
              }
            },

            primary: {
              color: info.main,
              backgroundColor: transparent.main,

              '&:hover': {
                color: info.focus,
                backgroundColor: transparent.main
              },

              '&:focus:not(:hover)': {
                color: info.focus,
                backgroundColor: transparent.focus,
                boxShadow: 'none'
              }
            },

            secondary: {
              color: secondary.focus,
              backgroundColor: transparent.main,

              '&:hover': {
                color: secondary.focus,
                backgroundColor: transparent.main
              },

              '&:focus:not(:hover)': {
                color: secondary.focus,
                backgroundColor: transparent.focus,
                boxShadow: 'none'
              }
            }
          })
        })
      }
    },
    MuiSwitch: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          width: pxToRem(40),
          height: pxToRem(20),
          margin: `${pxToRem(4)} 0`,
          padding: 0,
          borderRadius: pxToRem(160),
          transition: 'transform 250ms ease-in'
        },
        switchBase: {
          padding: 0,
          top: '50%',
          transform: `translate(${pxToRem(2)}, -50%)`,
          transition: `transform 250ms ease-in-out`,
          '&.Mui-checked': {
            transform: `translate(${pxToRem(22)}, -50%)`,
            '& + .MuiSwitch-track': {
              backgroundColor: `${rgba(gradients.info.state, 0.95)} !important`,
              borderColor: `${rgba(gradients.info.state, 0.95)} !important`,
              opacity: 1
            }
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: '0.3 !important'
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            backgroundImage: linearGradient(gradients.info.main, gradients.info.state)
          }
        },
        thumb: {
          width: pxToRem(16),
          height: pxToRem(16),
          backgroundColor: white.main,
          boxShadow: md,
          top: '50%'
        },
        track: {
          backgroundColor: rgba(gradients.dark.state, 0.1),
          border: `${borderWidth[1]} solid ${light.main}`,
          borderRadius: pxToRem(160),
          opacity: 1,
          transition: `background-color 250ms ease, border-color 200ms ease`
        },
        checked: {}
      }
    },
    MuiSvgIcon: {
      defaultProps: {
        fontSize: 'inherit'
      },

      styleOverrides: {
        fontSizeInherit: {
          fontSize: 'inherit !important'
        },

        fontSizeSmall: {
          fontSize: `${pxToRem(20)} !important`
        },

        fontSizeLarge: {
          fontSize: `${pxToRem(36)} !important`
        }
      }
    },
    MuiMenu: {
      defaultProps: {
        disableAutoFocusItem: true
      },
      styleOverrides: {
        paper: {
          minWidth: pxToRem(160),
          boxShadow: `${lg} !important`,
          padding: `${pxToRem(8)} ${pxToRem(8)}`,
          fontSize: size.sm,
          color: text.main,
          textAlign: 'left',
          backgroundColor: `${white.main} !important`,
          borderRadius: `${borderRadius.md} !important`
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          minWidth: pxToRem(160),
          minHeight: 'unset',
          padding: `${pxToRem(4.8)} ${pxToRem(16)}`,
          borderRadius: borderRadius.md,
          fontSize: size.sm,
          color: text.main,
          transition: 'background-color 300ms ease, color 300ms ease',
          '&:hover, &:focus, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus': {
            backgroundColor: light.main,
            color: dark.main
          }
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          position: 'relative',
          backgroundColor: grey[100],
          borderRadius: borderRadius.lg,
          minHeight: 'unset',
          padding: pxToRem(4)
        },

        flexContainer: {
          height: '100%',
          position: 'relative',
          zIndex: 10
        },

        fixed: {
          overflow: 'unset !important',
          overflowX: 'unset !important'
        },

        vertical: {
          '& .MuiTabs-indicator': {
            width: '100%'
          }
        },

        indicator: {
          height: '100%',
          borderRadius: borderRadius.md,
          backgroundColor: white.main,
          transition: 'all 500ms ease',
          boxShadow: tabsBoxShadow.indicator
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          flex: '1 1 auto',
          textAlign: 'center',
          maxWidth: 'unset !important',
          minWidth: 'unset !important',
          minHeight: 'unset !important',
          fontSize: size.md,
          fontWeight: fontWeightRegular,
          textTransform: 'none',
          lineHeight: 'inherit',
          padding: pxToRem(4),
          borderRadius: borderRadius.md,
          color: `${dark.main} !important`,
          opacity: '1 !important',

          '& .material-icons, .material-icons-round': {
            marginBottom: '0 !important',
            marginRight: pxToRem(4)
          },

          '& svg': {
            marginBottom: '0 !important',
            marginRight: pxToRem(6)
          }
        },

        labelIcon: {
          paddingTop: pxToRem(4)
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minWidth: 0,
          wordWrap: 'break-word',
          backgroundColor: white.main,
          backgroundClip: 'border-box',
          border: `${borderWidth[0]} solid ${rgba(black.main, 0.125)}`,
          borderRadius: borderRadius.xl,
          boxShadow: cardBoxShadow
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0,
          padding: `${pxToRem(8)} ${pxToRem(24)} ${pxToRem(24)}`
        }
      }
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.xl,
          margin: `${pxToRem(16)} ${pxToRem(16)} 0`
        },
        media: {
          width: 'auto'
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: pxToRem(20),
          height: pxToRem(20),
          marginRight: pxToRem(6),
          padding: 0,
          color: transparent.main,
          border: `${borderWidth[1]} solid ${borderColor}`,
          borderRadius: '50%',
          transition: 'all 250ms ease',

          '&:hover': {
            backgroundColor: transparent.main
          },

          '& .MuiSvgIcon-root': {
            fill: transparent.main
          },

          '&.Mui-focusVisible': {
            border: `${borderWidth[2]} solid ${info.main} !important`
          }
        },

        colorPrimary: {
          backgroundColor: transparent.main,

          '&.Mui-checked': {
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='15px' width='15px'%3E%3Ccircle cx='50%' cy='50%' r='3' fill='%23fff' /%3E%3C/svg%3E"), ${linearGradient(
              gradients.info.main,
              gradients.info.state
            )}`,
            borderColor: gradients.info.state
          },

          '&:hover': {
            backgroundColor: transparent.main
          }
        },

        colorSecondary: {
          backgroundColor: transparent.main,

          '&.Mui-checked': {
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='15px' width='15px'%3E%3Ccircle cx='50%' cy='50%' r='3' fill='%23fff' /%3E%3C/svg%3E"), ${linearGradient(
              gradients.info.main,
              gradients.info.state
            )}`,
            borderColor: gradients.info.state
          },

          '&:hover': {
            backgroundColor: transparent.main
          }
        }
      }
    }
  };
}