# Design System

## Color Tokens

Use design-system tokens instead of hard-coded UI colors.

For Android Compose, UI colors must be defined in `AppColors` and consumed from that object. Do not use `Color(0xFF...)` directly inside Composables.

For the current web app, use the matching CSS custom properties in `src/index.css` with the `--dojeon-color-*` prefix.

### App Background

| Token | Hex |
| --- | --- |
| Background | `#F8F8FB` |
| SplashBackground | `#D2A8E0` |
| SplashText | `#162F57` |
| Surface | `#FFFFFF` |

### Primary

| Token | Hex |
| --- | --- |
| Primary50 | `#F7F0F9` |
| Primary100 | `#E7D7F0` |
| Primary200 | `#D3B7E4` |
| Primary300 | `#BF96D8` |
| Primary400 | `#AD77CD` |
| Primary500 | `#872FB8` |
| Primary600 | `#844CA5` |
| Primary700 | `#67218F` |
| Primary800 | `#59326E` |
| Primary900 | `#361F56` |

### Primary UI Aliases

| Token | Hex | Usage |
| --- | --- | --- |
| PrimaryAction | `#872FB8` | Main CTA buttons, active progress areas, emphasized actions |
| PrimaryContainer | `#ECE5F4` | Selected tabs, choice cards, input areas, light emphasis backgrounds |
| PrimaryBorder | `#DFC9EC` | Choice card borders and light primary outlines |
| PrimaryFocusRing | `rgba(223, 201, 236, 0.35)` | Focus outlines for inputs and controls |
| TabInactive | `#E1E2EE` | Unselected goal tabs |

### Secondary

| Token | Hex |
| --- | --- |
| Secondary50 | `#FFFDF1` |
| Secondary100 | `#FDFADE` |
| Secondary200 | `#FDF6C5` |
| Secondary300 | `#FBF2AC` |
| Secondary400 | `#FBEF94` |
| Secondary500 | `#F9EC7F` |
| SecondaryContainer | `#FFF3A3` |
| GoalBubble | `#FCDF6B` |
| Secondary600 | `#D2BF6A` |
| Secondary700 | `#B09F58` |
| Secondary800 | `#8D8047` |
| Secondary900 | `#6F6438` |

### Grayscale

| Token | Hex |
| --- | --- |
| Gray50 | `#F7F7F7` |
| Gray100 | `#EFEFF5` |
| Gray200 | `#E9E9EF` |
| Gray300 | `#C9C9CF` |
| Gray400 | `#BCBCBD` |
| Gray500 | `#8C8C8C` |
| Gray600 | `#737373` |
| Gray700 | `#4A4A4A` |
| Gray800 | `#242424` |
| Gray900 | `#000000` |

### Semantic

| Token | Hex |
| --- | --- |
| ErrorLight | `#FBE8E7` |
| Error | `#D3362B` |
| ErrorSurface | `#FBE8E7` |

## Android Compose Reference

When an Android Compose module is present, `Color.kt` should expose these tokens through `AppColors`:

```kotlin
object AppColors {
    val Background = Color(0xFFF8F8FB)
    val SplashBackground = Color(0xFFD2A8E0)
    val SplashText = Color(0xFF162F57)
    val Surface = Color(0xFFFFFFFF)

    val Primary50 = Color(0xFFF7F0F9)
    val Primary100 = Color(0xFFE7D7F0)
    val Primary200 = Color(0xFFD3B7E4)
    val Primary300 = Color(0xFFBF96D8)
    val Primary400 = Color(0xFFAD77CD)
    val Primary500 = Color(0xFF872FB8)
    val Primary600 = Color(0xFF844CA5)
    val Primary700 = Color(0xFF67218F)
    val Primary800 = Color(0xFF59326E)
    val Primary900 = Color(0xFF361F56)
    val PrimaryAction = Color(0xFF872FB8)
    val PrimaryContainer = Color(0xFFECE5F4)
    val PrimaryBorder = Color(0xFFDFC9EC)
    val TabInactive = Color(0xFFE1E2EE)

    val Secondary50 = Color(0xFFFFFDF1)
    val Secondary100 = Color(0xFFFDFADE)
    val Secondary200 = Color(0xFFFDF6C5)
    val Secondary300 = Color(0xFFFBF2AC)
    val Secondary400 = Color(0xFFFBEF94)
    val Secondary500 = Color(0xFFF9EC7F)
    val SecondaryContainer = Color(0xFFFFF3A3)
    val GoalBubble = Color(0xFFFCDF6B)
    val Secondary600 = Color(0xFFD2BF6A)
    val Secondary700 = Color(0xFFB09F58)
    val Secondary800 = Color(0xFF8D8047)
    val Secondary900 = Color(0xFF6F6438)

    val Gray50 = Color(0xFFF7F7F7)
    val Gray100 = Color(0xFFEFEFF5)
    val Gray200 = Color(0xFFE9E9EF)
    val Gray300 = Color(0xFFC9C9CF)
    val Gray400 = Color(0xFFBCBCBD)
    val Gray500 = Color(0xFF8C8C8C)
    val Gray600 = Color(0xFF737373)
    val Gray700 = Color(0xFF4A4A4A)
    val Gray800 = Color(0xFF242424)
    val Gray900 = Color(0xFF000000)

    val ErrorLight = Color(0xFFFBE8E7)
    val Error = Color(0xFFD3362B)
    val ErrorSurface = ErrorLight
}
```
