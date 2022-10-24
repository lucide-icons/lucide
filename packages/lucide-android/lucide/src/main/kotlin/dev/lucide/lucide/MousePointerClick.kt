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

public val Lucide.MousePointerClick: ImageVector
    get() {
        if (_mousePointerClick != null) {
            return _mousePointerClick!!
        }
        _mousePointerClick = Builder(name = "MousePointerClick", defaultWidth = 24.0.dp,
                defaultHeight = 24.0.dp, viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(9.0f, 9.0f)
                lineToRelative(5.0f, 12.0f)
                lineToRelative(1.774f, -5.226f)
                lineTo(21.0f, 14.0f)
                lineTo(9.0f, 9.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(16.071f, 16.071f)
                lineToRelative(4.243f, 4.243f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(7.188f, 2.239f)
                lineToRelative(0.777f, 2.897f)
                moveTo(5.136f, 7.965f)
                lineToRelative(-2.898f, -0.777f)
                moveTo(13.95f, 4.05f)
                lineToRelative(-2.122f, 2.122f)
                moveToRelative(-5.657f, 5.656f)
                lineToRelative(-2.12f, 2.122f)
            }
        }
        .build()
        return _mousePointerClick!!
    }

private var _mousePointerClick: ImageVector? = null
