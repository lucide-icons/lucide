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

public val Lucide.HeartOff: ImageVector
    get() {
        if (_heartOff != null) {
            return _heartOff!!
        }
        _heartOff = Builder(name = "HeartOff", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(4.12f, 4.107f)
                arcToRelative(5.4f, 5.4f, 0.0f, false, false, -0.538f, 0.473f)
                curveTo(1.46f, 6.7f, 1.33f, 10.28f, 4.0f, 13.0f)
                lineToRelative(8.0f, 8.0f)
                lineToRelative(4.5f, -4.5f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(19.328f, 13.672f)
                lineTo(20.0f, 13.0f)
                curveToRelative(2.67f, -2.72f, 2.54f, -6.3f, 0.42f, -8.42f)
                arcToRelative(5.4f, 5.4f, 0.0f, false, false, -7.65f, 0.0f)
                lineToRelative(-0.77f, 0.78f)
                lineToRelative(-0.77f, -0.78f)
                arcToRelative(5.4f, 5.4f, 0.0f, false, false, -2.386f, -1.393f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(2.0f, 2.0f)
                lineTo(22.0f, 22.0f)
            }
        }
        .build()
        return _heartOff!!
    }

private var _heartOff: ImageVector? = null
