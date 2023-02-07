import breakpoints from './base/breakpoints';

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
  const { md, buttonBoxShadow, lg, cardBoxShadow, tabsBoxShadow, xxl } = boxShadows;
  const { values } = breakpoints;
  const { pxToRem, rgba, linearGradient, boxShadow } = functions;

  return {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth'
        },
        '*, *::before, *::after': {
          margin: 0,
          padding: 0
        },
        'a, a:link, a:visited': {
          textDecoration: 'none !important'
        },
        'a.link, .link, a.link:link, .link:link, a.link:visited, .link:visited': {
          color: `${dark.main} !important`,
          transition: 'color 150ms ease-in !important'
        },
        'a.link:hover, .link:hover, a.link:focus, .link:focus': {
          color: `${info.main} !important`
        },
        hr: {
          borderBottom: 0,
          borderLeft: 0,
          borderRight: 0
        },
        [`@media (min-width: ${values.sm}px)`]: {
          '.MuiContainer-root': {
            paddingRight: `${pxToRem(24)} !important`,
            paddingLeft: `${pxToRem(24)} !important`,
            marginRight: 'auto !important',
            marginLeft: 'auto !important',
            width: '100% !important',
            position: 'relative',
            maxWidth: '540px !important'
          }
        },
        [`@media (min-width: ${values.md}px)`]: {
          '.MuiContainer-root': {
            paddingRight: `${pxToRem(24)} !important`,
            paddingLeft: `${pxToRem(24)} !important`,
            marginRight: 'auto !important',
            marginLeft: 'auto !important',
            width: '100% !important',
            position: 'relative',
            maxWidth: '720px !important'
          }
        },
        [`@media (min-width: ${values.lg}px)`]: {
          '.MuiContainer-root': {
            paddingRight: `${pxToRem(24)} !important`,
            paddingLeft: `${pxToRem(24)} !important`,
            marginRight: 'auto !important',
            marginLeft: 'auto !important',
            width: '100% !important',
            position: 'relative',
            maxWidth: '960px !important'
          }
        },
        [`@media (min-width: ${values.xl}px)`]: {
          '.MuiContainer-root': {
            paddingRight: `${pxToRem(24)} !important`,
            paddingLeft: `${pxToRem(24)} !important`,
            marginRight: 'auto !important',
            marginLeft: 'auto !important',
            width: '100% !important',
            position: 'relative',
            maxWidth: '1140px !important'
          }
        },
        [`@media (min-width: ${values.xxl}px)`]: {
          '.MuiContainer-root': {
            paddingRight: `${pxToRem(24)} !important`,
            paddingLeft: `${pxToRem(24)} !important`,
            marginRight: 'auto !important',
            marginLeft: 'auto !important',
            width: '100% !important',
            position: 'relative',
            maxWidth: '1320px !important'
          }
        }
      }
    },
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
          height: '100%'
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
    MuiOutlinedInput: {
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
          height: pxToRem(22)
          // width: 'max-content !important'
        },
        inputSizeSmall: {
          height: pxToRem(14)
        }
      }
    },
    MuiFilledInput: {
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
        select: {
          display: 'grid',
          alignItems: 'center',
          padding: `0 !important`,

          '& .Mui-selected': {
            backgroundColor: transparent.main
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
          height: pxToRem(27),
          paddingTop: '0 !important',
          paddingRight: '0 !important',
          paddingBottom: '0 !important',
          paddingLeft: pxToRem(6),
          '&::-webkit-input-placeholder': {
            color: `${dark.main} !important`
          },
          '&::-webkit-outer-spin-button': {
            WebkitAppearance: 'none',
            margin: 0
          },
          '&::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0
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
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
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
          }
        },
        contained: {
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
          }
        },
        containedSizeSmall: {
          minHeight: pxToRem(32),
          padding: `${pxToRem(8)} ${pxToRem(32)}`,
          fontSize: size.xs,

          '& .material-icon, .material-icons-round, svg': {
            fontSize: `${pxToRem(12)} !important`
          }
        },
        containedSizeLarge: {
          minHeight: pxToRem(47),
          padding: `${pxToRem(14)} ${pxToRem(64)}`,
          fontSize: size.sm,

          '& .material-icon, .material-icons-round, svg': {
            fontSize: `${pxToRem(22)} !important`
          }
        },
        containedPrimary: {
          backgroundColor: info.main,

          '&:hover': {
            backgroundColor: info.main
          },

          '&:focus:not(:hover)': {
            backgroundColor: info.focus,
            boxShadow: buttonBoxShadow.stateOfNotHover
          }
        },
        containedSecondary: {
          backgroundColor: secondary.main,

          '&:hover': {
            backgroundColor: secondary.main
          },

          '&:focus:not(:hover)': {
            backgroundColor: secondary.focus,
            boxShadow: buttonBoxShadow.stateOfNotHover
          }
        },
        outlined: {
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
          }
        },
        outlinedSizeSmall: {
          minHeight: pxToRem(34),
          padding: `${pxToRem(8)} ${pxToRem(32)}`,
          fontSize: size.xs,

          '& .material-icon, .material-icons-round, svg': {
            fontSize: `${pxToRem(12)} !important`
          }
        },
        outlinedSizeLarge: {
          minHeight: pxToRem(49),
          padding: `${pxToRem(14)} ${pxToRem(64)}`,
          fontSize: size.sm,

          '& .material-icon, .material-icons-round, svg': {
            fontSize: `${pxToRem(22)} !important`
          }
        },
        outlinedPrimary: {
          backgroundColor: transparent.main,
          borderColor: info.main,

          '&:hover': {
            backgroundColor: transparent.main
          },

          '&:focus:not(:hover)': {
            boxShadow: buttonBoxShadow.stateOfNotHover
          }
        },
        outlinedSecondary: {
          backgroundColor: transparent.main,
          borderColor: secondary.main,

          '&:hover': {
            backgroundColor: transparent.main
          },

          '&:focus:not(:hover)': {
            boxShadow: buttonBoxShadow.stateOfNotHover
          }
        },
        text: {
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
          }
        },
        textSizeSmall: {
          fontSize: size.xs,

          '& .material-icons, .material-icons-round, svg, span': {
            fontSize: `${pxToRem(12)} !important`
          }
        },
        textSizeLarge: {
          fontSize: size.sm,

          '& .material-icons, .material-icons-round, svg, span': {
            fontSize: `${pxToRem(22)} !important`
          }
        },
        textPrimary: {
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
        textSecondary: {
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
    MuiListItem: {
      defaultProps: {
        disableGutters: true
      },

      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0
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
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: transparent.main,
          backgroundImage: `linear-gradient(to right, ${rgba(dark.main, 0)}, ${rgba(
            dark.main,
            0.4
          )}, ${rgba(dark.main, 0)}) !important`,
          height: pxToRem(1),
          margin: `${pxToRem(16)} 0`,
          borderBottom: 0,
          borderLeft: 0,
          borderRight: 0,
          opacity: 0.25
        },

        vertical: {
          backgroundColor: transparent.main,
          backgroundImage: `linear-gradient(180deg, ${rgba(dark.main, 0)}, ${rgba(
            dark.main,
            0.4
          )}, ${rgba(dark.main, 0)}) !important`,
          width: pxToRem(1),
          height: '100%',
          margin: `0 ${pxToRem(16)}`,
          borderRight: 'unset'
        },

        light: {
          backgroundColor: transparent.main,
          backgroundImage: `linear-gradient(to right, ${rgba(white.main, 0)}, ${white.main}, ${rgba(
            white.main,
            0
          )}) !important`,

          '&.MuiDivider-vertical': {
            backgroundImage: `linear-gradient(180deg, ${rgba(white.main, 0)}, ${white.main}, ${rgba(
              white.main,
              0
            )}) !important`
          }
        }
      }
    },
    MuiIcon: {
      defaultProps: {
        baseClassName: 'material-icons-round',
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
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: pxToRem(3),
          borderRadius: borderRadius.md,
          overflow: 'visible',
          position: 'relative'
        },

        colorPrimary: {
          backgroundColor: light.main
        },

        colorSecondary: {
          backgroundColor: light.main
        },

        bar: {
          height: '100%',
          borderRadius: borderRadius.sm,
          position: 'absolute',
          transform: `translate(0, 0) !important`,
          transition: 'width 0.6s ease !important'
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          width: pxToRem(256),
          whiteSpace: 'nowrap',
          border: 'none'
        },

        paper: {
          width: pxToRem(256),
          backgroundColor: white.main,
          height: `calc(100vh - ${pxToRem(32)})`,
          margin: `${pxToRem(16)} 0 ${pxToRem(16)} ${pxToRem(16)}`,
          borderRadius: borderRadius.xl,
          border: 'none'
        },

        paperAnchorDockedLeft: {
          borderRight: 'none'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: `${pxToRem(12)} ${pxToRem(16)}`,
          borderBottom: `${borderWidth[1]} solid ${light.main}`
        }
      }
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: white.main,
          boxShadow: cardBoxShadow,
          borderRadius: borderRadius.xl
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          display: 'block',
          padding: `${pxToRem(16)} ${pxToRem(16)} 0  ${pxToRem(16)}`,
          borderRadius: `${borderRadius.xl} ${borderRadius.xl} 0 0`
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        popper: {
          boxShadow: lg,
          padding: pxToRem(8),
          fontSize: size.sm,
          color: text.main,
          textAlign: 'left',
          backgroundColor: `${white.main} !important`,
          borderRadius: borderRadius.md
        },

        paper: {
          boxShadow: 'none',
          backgroundColor: transparent.main
        },

        option: {
          padding: `${pxToRem(4.8)} ${pxToRem(16)}`,
          borderRadius: borderRadius.md,
          fontSize: size.sm,
          color: text.main,
          transition: 'background-color 300ms ease, color 300ms ease',

          '&:hover, &:focus, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus': {
            backgroundColor: light.main,
            color: dark.main
          },

          '&[aria-selected="true"]': {
            backgroundColor: `${light.main} !important`,
            color: `${dark.main} !important`
          }
        },

        noOptions: {
          fontSize: size.sm,
          color: text.main
        },

        groupLabel: {
          color: dark.main
        },

        loading: {
          fontSize: size.sm,
          color: text.main
        },

        tag: {
          display: 'flex',
          alignItems: 'center',
          height: 'auto',
          padding: pxToRem(4),
          backgroundColor: gradients.dark.state,
          color: white.main,

          '& .MuiChip-label': {
            lineHeight: 1.2,
            padding: `0 ${pxToRem(10)} 0 ${pxToRem(4)}`
          },

          '& .MuiSvgIcon-root, & .MuiSvgIcon-root:hover, & .MuiSvgIcon-root:focus': {
            color: white.main,
            marginRight: 0
          }
        }
      }
    },
    MuiCheckbox: {
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
          borderRadius: pxToRem(5.6),
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
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -1 22 22'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M6 10l3 3l6-6'/%3e%3c/svg%3e"), ${linearGradient(
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
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -1 22 22'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M6 10l3 3l6-6'/%3e%3c/svg%3e"), ${linearGradient(
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
          boxShadow: tabsBoxShadow.indicator,
          transition: 'all 500ms ease'
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
    MuiCardContent: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0,
          padding: `${pxToRem(8)} ${pxToRem(24)} ${pxToRem(24)}`
        }
      }
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        li: {
          lineHeight: 0
        },

        separator: {
          fontSize: size.sm,
          color: grey[600]
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:not(:last-child)': {
            borderBottom: `${borderWidth[1]} solid ${borderColor}`
          }
        }
      }
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          margin: `${pxToRem(48)} 0`,
          padding: `0 ${pxToRem(12)}`,

          '&.MuiPaper-root': {
            backgroundColor: transparent.main
          }
        }
      }
    },
    MuiStep: {
      styleOverrides: {
        root: {
          padding: `0 ${pxToRem(6)}`
        }
      }
    },
    MuiStepConnector: {
      styleOverrides: {
        root: {
          color: borderColor,
          transition: 'all 200ms linear',

          '&.Mui-active': {
            color: dark.main
          },

          '&.Mui-completed': {
            color: dark.main
          }
        },

        alternativeLabel: {
          top: '14%',
          left: '-50%',
          right: '50%'
        },

        line: {
          borderWidth: `${borderWidth[2]} !important`,
          borderColor: 'currentColor'
        }
      }
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          background: white.main,
          fill: white.main,
          stroke: white.main,
          strokeWidth: pxToRem(10),
          width: pxToRem(13),
          height: pxToRem(13),
          border: `${borderWidth[2]} solid ${borderColor}`,
          borderRadius: '50%',
          zIndex: 99,
          transition: 'all 200ms linear',

          '&.Mui-active': {
            background: dark.main,
            fill: dark.main,
            stroke: dark.main,
            borderColor: dark.main,
            boxShadow: boxShadow([0, 0], [0, 2], dark.main, 1)
          },

          '&.Mui-completed': {
            background: dark.main,
            fill: dark.main,
            stroke: dark.main,
            borderColor: dark.main,
            boxShadow: boxShadow([0, 0], [0, 2], dark.main, 1)
          }
        }
      }
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          marginTop: `${pxToRem(8)} !important`,
          fontWeight: fontWeightRegular,
          fontSize: size.md,
          color: grey[300],

          '&.Mui-active': {
            fontWeight: `${fontWeightRegular} !important`,
            color: `${dark.main} !important`
          },

          '&.Mui-completed': {
            fontWeight: `${fontWeightRegular} !important`,
            color: `${secondary.main} !important`
          }
        }
      }
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: transparent.main,
          boxShadow: lg,
          padding: pxToRem(8),
          borderRadius: borderRadius.lg
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: borderRadius.lg,
          boxShadow: xxl
        },

        paperFullScreen: {
          borderRadius: 0
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: pxToRem(16),
          fontSize: size.xl
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: pxToRem(16),
          fontSize: size.md,
          color: text.main
        },

        dividers: {
          borderTop: `${borderWidth[1]} solid ${borderColor}`,
          borderBottom: `${borderWidth[1]} solid ${borderColor}`
        }
      }
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          fontSize: size.md,
          color: text.main
        }
      }
    },
    MuiDialogAction: {
      styleOverrides: {
        root: {
          padding: pxToRem(16)
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%'
        }
      }
    }
  };
}
