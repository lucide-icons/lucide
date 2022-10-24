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

public val Lucide.Hammer: ImageVector
    get() {
        if (_hammer != null) {
            return _hammer!!
        }
        _hammer = Builder(name = "Hammer", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(15.0f, 12.0f)
                lineToRelative(-8.5f, 8.5f)
                curveToRelative(-0.83f, 0.83f, -2.17f, 0.83f, -3.0f, 0.0f)
                curveToRelative(0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f)
                arcToRelative(2.12f, 2.12f, 0.0f, false, true, 0.0f, -3.0f)
                lineTo(12.0f, 9.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(17.64f, 15.0f)
                lineTo(22.0f, 10.64f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(20.91f, 11.7f)
                lineToRelative(-1.25f, -1.25f)
                curveToRelative(-0.6f, -0.6f, -0.93f, -1.4f, -0.93f, -2.25f)
                verticalLineToRelative(-0.86f)
                lineTo(16.01f, 4.6f)
                arcToRelative(5.56f, 5.56f, 0.0f, false, false, -3.94f, -1.64f)
                horizontalLineTo(9.0f)
                lineToRelative(0.92f, 0.82f)
                arcTo(6.18f, 6.18f, 0.0f, false, true, 12.0f, 8.4f)
                verticalLineToRelative(1.56f)
                lineToRelative(2.0f, 2.0f)
                horizontalLineToRelative(2.47f)
                lineToRelative(2.26f, 1.91f)
            }
        }
        .build()
        return _hammer!!
    }

private var _hammer: ImageVector? = null
