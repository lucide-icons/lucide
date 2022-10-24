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

public val Lucide.Rotate3d: ImageVector
    get() {
        if (_rotate3d != null) {
            return _rotate3d!!
        }
        _rotate3d = Builder(name = "Rotate3d", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(16.466f, 7.5f)
                curveTo(15.643f, 4.237f, 13.952f, 2.0f, 12.0f, 2.0f)
                curveTo(9.239f, 2.0f, 7.0f, 6.477f, 7.0f, 12.0f)
                reflectiveCurveToRelative(2.239f, 10.0f, 5.0f, 10.0f)
                curveToRelative(0.342f, 0.0f, 0.677f, -0.069f, 1.0f, -0.2f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(15.194f, 13.707f)
                lineToRelative(3.814f, 1.86f)
                lineToRelative(-1.86f, 3.814f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(19.0f, 15.57f)
                curveToRelative(-1.804f, 0.885f, -4.274f, 1.43f, -7.0f, 1.43f)
                curveToRelative(-5.523f, 0.0f, -10.0f, -2.239f, -10.0f, -5.0f)
                reflectiveCurveToRelative(4.477f, -5.0f, 10.0f, -5.0f)
                curveToRelative(4.838f, 0.0f, 8.873f, 1.718f, 9.8f, 4.0f)
            }
        }
        .build()
        return _rotate3d!!
    }

private var _rotate3d: ImageVector? = null
