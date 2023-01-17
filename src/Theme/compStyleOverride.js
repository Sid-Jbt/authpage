export default function componentStyleOverrides(theme) {
  const { palette, typography, borders, boxShadows, functions } = theme;
  const { inputColors, transparent, dark, white, grey, gradients, light, text, info, secondary } =
    palette;
  const { size, fontWeightRegular, fontWeightBold } = typography;
  const { borderWidth, borderRadius } = borders;
  const { md, buttonBoxShadow, lg } = boxShadows;
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
          color: dark.main
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
    MuiSelect: {
      styleOverrides: {
        root: {
          padding: `${pxToRem(8)} ${pxToRem(12)}`,
          borderRadius: `${borderRadius.md}`,
          border: 0
        },
        select: {
          display: 'grid',
          alignItems: 'center',
          padding: 0,
          '& .Mui-selected': {
            backgroundColor: transparent.main,
            border: 0
          }
        },
        selectMenu: {
          background: 'none',
          height: 'none',
          minHeight: 'none',
          overflow: 'unset'
        },
        icon: {
          display: 'inline'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          display: 'flex !important',
          alignItems: 'center !important',
          // width: '100% !important',
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
          ...((ownerState.variant === 'contained' && {
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
            '&.MuiButton-containedSizeSmall': {
              minHeight: pxToRem(32),
              padding: `${pxToRem(8)} ${pxToRem(15)}`,
              fontSize: size.xs,

              '& .material-icon, .material-icons-round, svg': {
                fontSize: `${pxToRem(12)} !important`
              }
            },

            '&.MuiButton-containedSizeLarge': {
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
          }) ||
            (ownerState.variant === 'outlined' && {
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
              '&.MuiButton-outlinedSizeSmall': {
                minHeight: pxToRem(34),
                padding: `${pxToRem(8)} ${pxToRem(32)}`,
                fontSize: size.xs,

                '& .material-icon, .material-icons-round, svg': {
                  fontSize: `${pxToRem(12)} !important`
                }
              },
              '&.MuiButton-outlinedSizeLarge': {
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
            }) ||
            (ownerState.variant === 'text' && {
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
            }))
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
    }
  };
}
