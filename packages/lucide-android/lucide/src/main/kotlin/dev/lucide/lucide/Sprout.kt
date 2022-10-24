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

public val Lucide.Sprout: ImageVector
    get() {
        if (_sprout != null) {
            return _sprout!!
        }
        _sprout = Builder(name = "Sprout", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(7.0f, 20.0f)
                horizontalLineToRelative(10.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(10.0f, 20.0f)
                curveToRelative(5.5f, -2.5f, 0.8f, -6.4f, 3.0f, -10.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(9.5f, 9.4f)
                curveToRelative(1.1f, 0.8f, 1.8f, 2.2f, 2.3f, 3.7f)
                curveToRelative(-2.0f, 0.4f, -3.5f, 0.4f, -4.8f, -0.3f)
                curveToRelative(-1.2f, -0.6f, -2.3f, -1.9f, -3.0f, -4.2f)
                curveToRelative(2.8f, -0.5f, 4.4f, 0.0f, 5.5f, 0.8f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(14.1f, 6.0f)
                arcToRelative(7.0f, 7.0f, 0.0f, false, false, -1.1f, 4.0f)
                curveToRelative(1.9f, -0.1f, 3.3f, -0.6f, 4.3f, -1.4f)
                curveToRelative(1.0f, -1.0f, 1.6f, -2.3f, 1.7f, -4.6f)
                curveToRelative(-2.7f, 0.1f, -4.0f, 1.0f, -4.9f, 2.0f)
                close()
            }
        }
        .build()
        return _sprout!!
    }

private var _sprout: ImageVector? = null
