# Design System

## Color Tokens

Use design-system tokens instead of hard-coded UI colors.

For Android Compose, UI colors must be defined in `AppColors` and consumed from that object. Do not use `Color(0xFF...)` directly inside Composables.

For the current web app, use the matching CSS custom properties in `src/index.css` with the `--dojeon-color-*` prefix.

### App Background

| Token | Hex |
| --- | --- |
| Background | `#FBFAFB` |

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
| Primary700 | `#6E3F8A` |
| Primary800 | `#59326E` |
| Primary900 | `#361F56` |

### Primary UI Aliases

| Token | Hex | Usage |
| --- | --- | --- |
| PrimaryContainer | `#F7F0F9` | Choice cards, input areas, light emphasis backgrounds |
| PrimaryBorder | `#DFC9EC` | Choice card borders and light primary outlines |
| PrimaryFocusRing | `rgba(223, 201, 236, 0.35)` | Focus outlines for inputs and controls |

### Secondary

| Token | Hex |
| --- | --- |
| Secondary50 | `#FFFDF1` |
| Secondary100 | `#FDFADE` |
| Secondary200 | `#FDF6C5` |
| Secondary300 | `#FBF2AC` |
| Secondary400 | `#FBEF94` |
| Secondary500 | `#F9EC7F` |
| Secondary600 | `#D2BF6A` |
| Secondary700 | `#B09F58` |
| Secondary800 | `#8D8047` |
| Secondary900 | `#6F6438` |

### Grayscale

| Token | Hex |
| --- | --- |
| Gray50 | `#F7F7F7` |
| Gray100 | `#EBEBEB` |
| Gray200 | `#E9E9E9` |
| Gray300 | `#BFBFBF` |
| Gray400 | `#BCBCBD` |
| Gray500 | `#8C8C8C` |
| Gray600 | `#737373` |
| Gray700 | `#4A4A4A` |
| Gray800 | `#292929` |
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
    val Background = Color(0xFFFBFAFB)

    val Primary50 = Color(0xFFF7F0F9)
    val Primary100 = Color(0xFFE7D7F0)
    val Primary200 = Color(0xFFD3B7E4)
    val Primary300 = Color(0xFFBF96D8)
    val Primary400 = Color(0xFFAD77CD)
    val Primary500 = Color(0xFF872FB8)
    val Primary600 = Color(0xFF844CA5)
    val Primary700 = Color(0xFF6E3F8A)
    val Primary800 = Color(0xFF59326E)
    val Primary900 = Color(0xFF361F56)
    val PrimaryContainer = Color(0xFFF7F0F9)
    val PrimaryBorder = Color(0xFFDFC9EC)

    val Secondary50 = Color(0xFFFFFDF1)
    val Secondary100 = Color(0xFFFDFADE)
    val Secondary200 = Color(0xFFFDF6C5)
    val Secondary300 = Color(0xFFFBF2AC)
    val Secondary400 = Color(0xFFFBEF94)
    val Secondary500 = Color(0xFFF9EC7F)
    val Secondary600 = Color(0xFFD2BF6A)
    val Secondary700 = Color(0xFFB09F58)
    val Secondary800 = Color(0xFF8D8047)
    val Secondary900 = Color(0xFF6F6438)

    val Gray50 = Color(0xFFF7F7F7)
    val Gray100 = Color(0xFFEBEBEB)
    val Gray200 = Color(0xFFE9E9E9)
    val Gray300 = Color(0xFFBFBFBF)
    val Gray400 = Color(0xFFBCBCBD)
    val Gray500 = Color(0xFF8C8C8C)
    val Gray600 = Color(0xFF737373)
    val Gray700 = Color(0xFF4A4A4A)
    val Gray800 = Color(0xFF292929)
    val Gray900 = Color(0xFF000000)

    val ErrorLight = Color(0xFFFBE8E7)
    val Error = Color(0xFFD3362B)
    val ErrorSurface = ErrorLight
}
```
