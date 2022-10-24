package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.Croissant: ImageVector
    get() {
        if (_croissant != null) {
            return _croissant!!
        }
        _croissant = Builder(name = "Croissant", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(4.6f, 13.11f)
                lineToRelative(5.79f, -3.21f)
                curveToRelative(1.89f, -1.05f, 4.79f, 1.78f, 3.71f, 3.71f)
                lineToRelative(-3.22f, 5.81f)
                curveTo(8.8f, 23.16f, 0.79f, 15.23f, 4.6f, 13.11f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(10.5f, 9.5f)
                lineToRelative(-1.0f, -2.29f)
                curveTo(9.2f, 6.48f, 8.8f, 6.0f, 8.0f, 6.0f)
                horizontalLineTo(4.5f)
                curveTo(2.79f, 6.0f, 2.0f, 6.5f, 2.0f, 8.5f)
                arcToRelative(7.71f, 7.71f, 0.0f, false, false, 2.0f, 4.83f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(8.0f, 6.0f)
                curveToRelative(0.0f, -1.55f, 0.24f, -4.0f, -2.0f, -4.0f)
                curveToRelative(-2.0f, 0.0f, -2.5f, 2.17f, -2.5f, 4.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(14.5f, 13.5f)
                lineToRelative(2.29f, 1.0f)
                curveToRelative(0.73f, 0.3f, 1.21f, 0.7f, 1.21f, 1.5f)
                verticalLineToRelative(3.5f)
                curveToRelative(0.0f, 1.71f, -0.5f, 2.5f, -2.5f, 2.5f)
                arcToRelative(7.71f, 7.71f, 0.0f, false, true, -4.83f, -2.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(18.0f, 16.0f)
                curveToRelative(1.55f, 0.0f, 4.0f, -0.24f, 4.0f, 2.0f)
                curveToRelative(0.0f, 2.0f, -2.17f, 2.5f, -4.0f, 2.5f)
            }
        }
        .build()
        return _croissant!!
    }

private var _croissant: ImageVector? = null
