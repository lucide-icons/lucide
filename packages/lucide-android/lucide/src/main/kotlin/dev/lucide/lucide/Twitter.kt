package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.Twitter: ImageVector
    get() {
        if (_twitter != null) {
            return _twitter!!
        }
        _twitter = Builder(name = "Twitter", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(22.0f, 4.0f)
                reflectiveCurveToRelative(-0.7f, 2.1f, -2.0f, 3.4f)
                curveToRelative(1.6f, 10.0f, -9.4f, 17.3f, -18.0f, 11.6f)
                curveToRelative(2.2f, 0.1f, 4.4f, -0.6f, 6.0f, -2.0f)
                curveTo(3.0f, 15.5f, 0.5f, 9.6f, 3.0f, 5.0f)
                curveToRelative(2.2f, 2.6f, 5.6f, 4.1f, 9.0f, 4.0f)
                curveToRelative(-0.9f, -4.2f, 4.0f, -6.6f, 7.0f, -3.8f)
                curveToRelative(1.1f, 0.0f, 3.0f, -1.2f, 3.0f, -1.2f)
                close()
            }
        }
        .build()
        return _twitter!!
    }

private var _twitter: ImageVector? = null
