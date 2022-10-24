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

public val Lucide.Plane: ImageVector
    get() {
        if (_plane != null) {
            return _plane!!
        }
        _plane = Builder(name = "Plane", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(17.8f, 19.2f)
                lineTo(16.0f, 11.0f)
                lineToRelative(3.5f, -3.5f)
                curveTo(21.0f, 6.0f, 21.5f, 4.0f, 21.0f, 3.0f)
                curveToRelative(-1.0f, -0.5f, -3.0f, 0.0f, -4.5f, 1.5f)
                lineTo(13.0f, 8.0f)
                lineTo(4.8f, 6.2f)
                curveToRelative(-0.5f, -0.1f, -0.9f, 0.1f, -1.1f, 0.5f)
                lineToRelative(-0.3f, 0.5f)
                curveToRelative(-0.2f, 0.5f, -0.1f, 1.0f, 0.3f, 1.3f)
                lineTo(9.0f, 12.0f)
                lineToRelative(-2.0f, 3.0f)
                horizontalLineTo(4.0f)
                lineToRelative(-1.0f, 1.0f)
                lineToRelative(3.0f, 2.0f)
                lineToRelative(2.0f, 3.0f)
                lineToRelative(1.0f, -1.0f)
                verticalLineToRelative(-3.0f)
                lineToRelative(3.0f, -2.0f)
                lineToRelative(3.5f, 5.3f)
                curveToRelative(0.3f, 0.4f, 0.8f, 0.5f, 1.3f, 0.3f)
                lineToRelative(0.5f, -0.2f)
                curveToRelative(0.4f, -0.3f, 0.6f, -0.7f, 0.5f, -1.2f)
                close()
            }
        }
        .build()
        return _plane!!
    }

private var _plane: ImageVector? = null
