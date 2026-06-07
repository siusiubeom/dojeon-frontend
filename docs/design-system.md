# Design System

## Color Tokens

Use design-system tokens instead of hard-coded UI colors.

For Android Compose, UI colors must be defined in `AppColors` and consumed from that object. Do not use `Color(0xFF...)` directly inside Composables.

For the current web app, use the matching CSS custom properties in `src/index.css` with the `--dojeon-color-*` prefix.

### Primary

| Token | Hex |
| --- | --- |
| Primary50 | `#F5EEF9` |
| Primary100 | `#E7D7F0` |
| Primary200 | `#D3B7E4` |
| Primary300 | `#BF96D8` |
| Primary400 | `#AD77CD` |
| Primary500 | `#9B59C2` |
| Primary600 | `#844CA5` |
| Primary700 | `#6E3F8A` |
| Primary800 | `#59326E` |
| Primary900 | `#462857` |

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
| Gray200 | `#DADADA` |
| Gray300 | `#BFBFBF` |
| Gray400 | `#A6A6A6` |
| Gray500 | `#8C8C8C` |
| Gray600 | `#737373` |
| Gray700 | `#4A4A4A` |
| Gray800 | `#292929` |
| Gray900 | `#242424` |

### Semantic

| Token | Hex |
| --- | --- |
| ErrorLight | `#FBE8E7` |
| Error | `#D3362B` |

## Android Compose Reference

When an Android Compose module is present, `Color.kt` should expose these tokens through `AppColors`:

```kotlin
object AppColors {
    val Primary50 = Color(0xFFF5EEF9)
    val Primary100 = Color(0xFFE7D7F0)
    val Primary200 = Color(0xFFD3B7E4)
    val Primary300 = Color(0xFFBF96D8)
    val Primary400 = Color(0xFFAD77CD)
    val Primary500 = Color(0xFF9B59C2)
    val Primary600 = Color(0xFF844CA5)
    val Primary700 = Color(0xFF6E3F8A)
    val Primary800 = Color(0xFF59326E)
    val Primary900 = Color(0xFF462857)

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
    val Gray200 = Color(0xFFDADADA)
    val Gray300 = Color(0xFFBFBFBF)
    val Gray400 = Color(0xFFA6A6A6)
    val Gray500 = Color(0xFF8C8C8C)
    val Gray600 = Color(0xFF737373)
    val Gray700 = Color(0xFF4A4A4A)
    val Gray800 = Color(0xFF292929)
    val Gray900 = Color(0xFF242424)

    val ErrorLight = Color(0xFFFBE8E7)
    val Error = Color(0xFFD3362B)
}
```
