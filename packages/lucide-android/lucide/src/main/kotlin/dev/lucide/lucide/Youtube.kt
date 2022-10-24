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

public val Lucide.Youtube: ImageVector
    get() {
        if (_youtube != null) {
            return _youtube!!
        }
        _youtube = Builder(name = "Youtube", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(12.0f, 19.0f)
                curveToRelative(-2.3f, 0.0f, -6.4f, -0.2f, -8.1f, -0.6f)
                curveToRelative(-0.7f, -0.2f, -1.2f, -0.7f, -1.4f, -1.4f)
                curveToRelative(-0.3f, -1.1f, -0.5f, -3.4f, -0.5f, -5.0f)
                reflectiveCurveToRelative(0.2f, -3.9f, 0.5f, -5.0f)
                curveToRelative(0.2f, -0.7f, 0.7f, -1.2f, 1.4f, -1.4f)
                curveTo(5.6f, 5.2f, 9.7f, 5.0f, 12.0f, 5.0f)
                reflectiveCurveToRelative(6.4f, 0.2f, 8.1f, 0.6f)
                curveToRelative(0.7f, 0.2f, 1.2f, 0.7f, 1.4f, 1.4f)
                curveToRelative(0.3f, 1.1f, 0.5f, 3.4f, 0.5f, 5.0f)
                reflectiveCurveToRelative(-0.2f, 3.9f, -0.5f, 5.0f)
                curveToRelative(-0.2f, 0.7f, -0.7f, 1.2f, -1.4f, 1.4f)
                curveToRelative(-1.7f, 0.4f, -5.8f, 0.6f, -8.1f, 0.6f)
                curveToRelative(0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(10.0f, 15.0f)
                lineToRelative(5.0f, -3.0f)
                lineToRelative(-5.0f, -3.0f)
                close()
            }
        }
        .build()
        return _youtube!!
    }

private var _youtube: ImageVector? = null
